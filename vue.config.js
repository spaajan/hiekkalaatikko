// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        '^/api/': {
          target: 'http://localhost:3080',
          changeOrigin: true, // so CORS doesn't bite us. 
          pathRewrite: { '^/api': '/' },
        }
      }
    }
  }