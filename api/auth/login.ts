import { ServerRequest } from 'https://deno.land/std@0.100.0/http/server.ts'
import { create, getNumericDate } from 'https://deno.land/x/djwt@v2.2/mod.ts'
import { conf } from './config.ts'

export default async (req: ServerRequest) => {
  const jwt = await create(
    { alg: 'HS512', typ: 'JWT' },
    { exp: getNumericDate(60 * 10), nbf: getNumericDate(0) },
    Deno.env.get('JWTSecret')!
  )
  const url = conf.code.getAuthorizationUri({ state: jwt })

  req.respond({
    status: 302,
    headers: new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
      Location: url.toString(),
    }),
    body: `Redirecting to ${url}.`,
  })
}
