module.exports = {
  parser: '@typescript-eslint/parser', // If you're using TypeScript
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
