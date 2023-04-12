module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended",
  "plugin:@typescript-eslint/recommended"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "eqeqeq":"error",
    "complexity":["error",3],
    "array-bracket-newline":"error",
    "array-bracket-spacing":"error",
    "block-scoped-var":"error",
    "no-mixed-spaces-and-tabs":"error",
    "dot-notation":"error",//accessarraypropertiesusingdotnotation"no-shadow":"error",//ifalreadyused"no-sequences":"error"
  }
}
