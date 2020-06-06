const appName = 'Notepad';

module.exports = {
  pwa: {
    name: appName,
    themeColor: '#00796A',
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = appName;
      return args;
    });
  },
};
