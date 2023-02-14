module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
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
