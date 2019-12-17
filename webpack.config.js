'use strict';

const path = require('path')
module.exports = {
  entry: {
    'app/index': 'app/web/page/app/index.vue',
    'admin/home/home': 'app/web/page/admin/home.vue',
    'admin/login/index': 'app/web/page/admin/login/index.vue', 
  },
  plugins: [{ imagemini: false }],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/web/')
    }
  }
};