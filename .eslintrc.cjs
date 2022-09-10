/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "node:true",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
