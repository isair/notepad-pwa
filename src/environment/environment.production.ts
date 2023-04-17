import { Environment } from './environment.models';

export const productionEnvironment: Environment = {
  autoSaveInterval: 3000,
  defaultTabTitle: 'New File',
  fileTypes: [
    {
      description: 'Text',
      accept: {
        'text/plain': ['.txt'],
      },
    },
    {
      description: 'Markdown',
      accept: {
        'text/markdown': ['.md'],
      },
    },
    {
      description: 'Data',
      accept: {
        'application/json': ['.json'],
        'text/yaml': ['.yml'],
        'text/xml': ['.xml'],
        'text/csv': ['.csv'],
      },
    },
    {
      description: 'Code',
      accept: {
        'text/plain': [
          '.vue',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.c',
          '.cpp',
          '.h',
          '.m',
          '.mm',
          '.swift',
          '.java',
          '.html',
          '.css',
          '.scss',
          '.styl',
          '.sass',
        ],
      },
    },
  ],
};
