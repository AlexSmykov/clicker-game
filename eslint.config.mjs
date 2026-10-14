// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import rxjsX from 'eslint-plugin-rxjs-x';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const SELECTOR_PREFIX = 'app';

export default defineConfig(
  globalIgnores(['dist/', '.angular/', 'coverage/', 'node_modules/']),

  {
    extends: [eslint.configs.recommended],
    files: ['**/*.{ts,mjs,js}'],
    plugins: {
      perfectionist,
      'unused-imports': unusedImports,
    },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-else-return': 'error',
      'no-param-reassign': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',

      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          newlinesBetween: 1,
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-imports': ['error', { type: 'natural' }],

      'unused-imports/no-unused-imports': 'error',
    },
  },

  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
      rxjsX.configs.recommended,
    ],
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'import-x': importX,
    },
    processor: angular.processInlineTemplates,
    settings: {
      'import-x/extensions': ['.ts'],
      'import-x/parsers': { '@typescript-eslint/parser': ['.ts'] },
      'import-x/resolver-next': [createNodeResolver({ extensions: ['.ts', '.mjs', '.js'] })],
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
      ],
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { considerDefaultExhaustiveForUnions: true },
      ],
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@angular-eslint/component-max-inline-declarations': ['error', { styles: 0, template: 0 }],
      '@angular-eslint/component-selector': [
        'error',
        { prefix: SELECTOR_PREFIX, style: 'kebab-case', type: 'element' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { prefix: SELECTOR_PREFIX, style: 'camelCase', type: 'attribute' },
      ],
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/use-injectable-provided-in': 'error',

      'no-restricted-syntax': [
        'error',
        {
          message: 'Component must have a separate template file referenced with templateUrl',
          selector:
            'Decorator[expression.callee.name="Component"] > CallExpression > ObjectExpression:not(:has(> Property[key.name="templateUrl"]))',
        },
        {
          message: 'Component must have a separate style file referenced with styleUrl',
          selector:
            'Decorator[expression.callee.name="Component"] > CallExpression > ObjectExpression:not(:has(> Property[key.name="styleUrl"]))',
        },
      ],

      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-self-import': 'error',
    },
  },

  {
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },

  prettier,
);
