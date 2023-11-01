import { registerAs } from '@nestjs/config';
export default registerAs('app', () => {
  const config = {
    port: process.env.PORT,
  };
  return config;
});
