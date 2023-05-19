import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST
    },
    email: {
      service: process.env.EMAIL_SERVICE,
      password: process.env.EMAIL_PASS,
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10)
    },
  };
});
