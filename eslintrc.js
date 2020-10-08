module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/quotes': ['error', 'single'],
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': "none",
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }]
  }
}