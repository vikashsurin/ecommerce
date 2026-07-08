import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  out: './drizzle',
  schema: './src/schema/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
