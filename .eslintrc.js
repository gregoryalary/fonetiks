module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks'],
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'react/function-component-definition': 'off',
      }
    },
  ],
};
