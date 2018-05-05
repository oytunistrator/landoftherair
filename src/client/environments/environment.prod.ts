
import { BUILDVARS } from './_vars';

const buildVersion = BUILDVARS.version.tag || BUILDVARS.version.semverString || BUILDVARS.version.raw || BUILDVARS.version.hash;
const buildDate = new Date();

export const environment = {
  production: true,
  server: {
    domain: 'server.rair.land',
    protocol: 'https',
    wsProtocol: 'wss',
    port: 443,
    silentExt: 'production'
  },
  client: {
    domain: 'play.rair.land',
    protocol: 'https',
    port: 443
  },
  auth0: {
    domain: 'landoftherair.auth0.com',
    client: 'U8bTIfByag72iLPYAf7LxXVrBDC0M-Ov',
    callbackUrl: 'https://play.rair.land',
    apiUrl: 'authidentifier'
  },
  stripe: {
    key: 'pk_live_dHe4YokXv14cVzmj38NYbqVU'
  },
  assetHashes: BUILDVARS.hashes,
  version: `${buildVersion} (built on ${buildDate}) - ${JSON.stringify(BUILDVARS.version)}`
};
