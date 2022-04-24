module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    'no-unused-vars': 'warn'
  }
}