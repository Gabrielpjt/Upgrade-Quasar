module.exports = {
  // This option interrupts the configuration hierarchy at this file
  root: true,

  parserOptions: {
    parser: '@babel/eslint-parser', // Using Babel parser
    ecmaVersion: 2021, // Allows parsing of modern ECMAScript features
    sourceType: 'module', // Allows use of imports
    requireConfigFile: false // Avoid requiring a Babel configuration file
  },

  env: {
    browser: true, // Define the environment as browser
    node: true // If you're also using Node.js, you can add this
  },

  extends: [
    'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    'airbnb-base' // Using Airbnb's base ESLint rules
  ],

  plugins: [
    'vue' // Required to lint *.vue files
  ],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true
  },

  // Add your custom rules here
  rules: {
    'no-param-reassign': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',

    // Allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'no-unused-vars': ['error', { args: 'none' }],
    'comma-dangle': ['error', { functions: 'never' }],
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'vue/no-unused-vars': 'off',
    'object-curly-newline': 'off',
    camelcase: 'off',
    'arrow-body-style': 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
    'vue/multi-word-component-names': 'off'
  }
};
