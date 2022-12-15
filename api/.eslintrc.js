module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'eslint-config-airbnb',
    'react-app',
  ],
  plugins: [],
  rules: {
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
  settings: {
    react: {
      version: 'detect',
    },
  },
};
