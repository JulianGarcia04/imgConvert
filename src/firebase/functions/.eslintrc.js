module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2017,
  },
  extends: ["eslint:recommended", "google", "prettier"],
  plugins: ["prettier"],
  rules: {
    quotes: ["error", "double"],
    "no-confusing-arrow": [
      "error",
      { allowParens: true, onlyOneSimpleParam: false },
    ],
  },
};
