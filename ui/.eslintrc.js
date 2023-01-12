module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint-config-airbnb',
    'plugin:react/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1,
      {
        extensions: [
          '.jsx',
        ],
      },
    ],
  },
};
