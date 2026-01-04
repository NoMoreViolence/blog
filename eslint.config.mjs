import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([...nextConfig, eslintConfigPrettier]);
