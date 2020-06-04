module.exports = {
  '*.{js,json,jsx,vue,ts,tsx}': 'vue-cli-service lint',
  '*.sh': 'shellcheck -x',
  '*.{md,yml,css}': 'prettier --write',
};
