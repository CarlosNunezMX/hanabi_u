require.config({
  baseUrl: '/public/js',  // Ruta base para los módulos
  paths: {
    'hono/jsx': 'hanabi/jsx',
    'source': 'source',
    'hanabi': 'hanabi',
    'app': 'source/index',
    'dev': 'dev'
  }
});

require(['app'], function (app) {
  // Inicializa la aplicación aquí si es necesario
});