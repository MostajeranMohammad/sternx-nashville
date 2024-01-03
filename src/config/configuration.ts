import { Configuration } from './validate';

export default () =>
  <Configuration>{
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    environment:
      process.env.ENVIRONMENT == 'production' ? 'production' : 'development',
    nashvilleGrpcEndpoint: process.env.NASHVILLE_GRPC_ENDPOINT,
    nashvilleGrpcPort: parseInt(process.env.NASHVILLE_GRPC_PORT, 10),
  };
