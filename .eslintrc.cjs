// eslint-disable-next-line no-undef
module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['solid', '@typescript-eslint', 'prettier', 'jsx-a11y'],
  rules: {
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
