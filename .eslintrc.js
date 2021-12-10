module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': 'off',
  },
};
