import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{ ignores: ['**/.eslintrc.js'] },
	...compat.extends('plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),
	{
		plugins: { '@typescript-eslint': typescriptEslintEslintPlugin },
		languageOptions: {
			globals: { ...globals.node },
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: 'module',
			parserOptions: {
				project: 'tsconfig.json',
				tsconfigRootDir: '/Users/irfnd/Coding/projects/yellow-taxi-irfnd/apps/backend',
			},
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'prettier/prettier': 'off',
		},
	},
];
