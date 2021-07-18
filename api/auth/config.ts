import { ServerRequest } from 'https://deno.land/std@0.100.0/http/server.ts'
import { OAuth2Client } from 'https://deno.land/x/oauth2_client@v0.2.1/mod.ts'

export const conf = new OAuth2Client({
  clientId: Deno.env.get('ClientID')!,
  clientSecret: Deno.env.get('ClientSecret')!,
  authorizationEndpointUri: 'https://discord.com/api/oauth2/authorize',
  tokenUri: 'https://discord.com/api/oauth2/token',
  redirectUri: `${Deno.env.get('URL')}/api/auth/callback`,
  defaults: {
    scope: 'identify connections',
  },
})

export default (req: ServerRequest) => {
  req.respond({ status: 200 })
}
