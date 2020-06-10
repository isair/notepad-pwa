export const productionEnvironment = {
  defaultTabTitle: 'New File',
  accepts: [
    {
      description: 'Text',
      extensions: ['txt'],
    },
    {
      description: 'Markdown',
      extensions: ['md'],
    },
    {
      description: 'Data',
      extensions: ['json', 'yml', 'xml', 'csv'],
    },
    {
      description: 'Code',
      extensions: [
        'vue',
        'js',
        'jsx',
        'ts',
        'tsx',
        'c',
        'cpp',
        'h',
        'm',
        'mm',
        'swift',
        'java',
        'html',
        'css',
        'scss',
        'styl',
        'sass',
      ],
    },
  ].map(accept => ({ ...accept, mimeTypes: ['text/plain'] })),
};
