var debug = false;
var baseUrl = '';

if(debug){
  baseUrl = '/public/dist'
}else{
  baseUrl = '/public/dev'
}
require.config({
  baseUrl: baseUrl,  // Ruta base para los módulos
  paths: {
    'hono/jsx': 'hanabi/jsx',
    'source': 'source',
    'hanabi': 'hanabi',
    'app': 'source/index',
    'dev': 'dev'
  }
});

require(['app'], function (app) {
  
});