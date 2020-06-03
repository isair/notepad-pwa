module.exports = {
  '*.{js,json}': 'eslint --fix',
  '*.sh': 'shellcheck -x',
  '*.{md,json,yml,html,css,js}': 'prettier --write',
};
