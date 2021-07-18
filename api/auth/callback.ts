import { ServerRequest } from 'https://deno.land/std@0.100.0/http/server.ts'
import { verify } from 'https://deno.land/x/djwt@v2.2/mod.ts'
import { conf } from './config.ts'

export default async (req: ServerRequest) => {
  const params = new URL(`http://localhost${req.url}`).searchParams
  const jwt = params.get('state')!
  await verify(jwt, Deno.env.get('JWTSecret')!, 'HS512')

  const tokens = await conf.code.getToken(req.url)
  const auth = { Authorization: `Bearer ${tokens.accessToken}` }
  const info = await (
    await fetch('https://discord.com/api/users/@me', { headers: auth })
  ).json()
  const connections = await (
    await fetch('https://discord.com/api/users/@me/connections', {
      headers: auth,
    })
  ).json()
  info['connections'] = connections

  req.respond({
    status: 200,
    headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
    body: JSON.stringify(info),
  })
}
