const appName = 'Notepad';

module.exports = {
  pwa: {
    name: appName,
    themeColor: '#388E3D',
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = appName;
      return args;
    });
  },
};
