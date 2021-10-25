import Server from 'gas-client';
import { ServerFunctions } from '../../common/serverTypes';

declare const process: any;

const { PORT } = process.env;

type ServerWrapper = {
  serverFunctions: ServerFunctions;
};

const server: ServerWrapper = new Server({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: `https://localhost:${PORT}`,
});

export default server;
