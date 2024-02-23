import { load } from 'ts-dotenv';

const env = load({
  API_PORT: Number,
  API_PASSWORD_SALT: Number,
  API_API_SECRET_TOKEN: Number,
  API_SECRET_TOKEN: String,

  POSTGRES_CONNECTION: String,
  POSTGRES_USERNAME: String,
  POSTGRES_PASSWORD: String,
  POSTGRES_DATABASE: String,
  POSTGRES_PORT: Number,
});

export default env;
