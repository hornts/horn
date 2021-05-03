module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.base.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "simple-import-sort",
    'prettier'
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'es5',
    }],

    "simple-import-sort/imports": [
      2,
      { "groups": [["^\\u0000"], ["^[^.]"], ["^\\."]] }
    ],

    'camelcase': 'off',
    'no-shadow': 'off',
    'no-console': 'error',
    'no-underscore-dangle': 'off',
    'no-else-return': 'off',
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',

    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-useless-path-segments': 'error',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',

    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
