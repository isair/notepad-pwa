module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      [
        'multi',
        'config',
        'github',
        'script',
        'deps',
        'dev-deps',
        'app',
        'release',
      ],
    ],
    'subject-case': [2, 'always', ['sentence-case']],
  },
};
