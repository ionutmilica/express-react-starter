module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  "plugins": ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prettier/prettier": "error",
  },
};
