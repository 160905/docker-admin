'use strict';
const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      basedir: path.join(app.baseDir, 'app/view')
    },
    injectRes:[
      {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/css/swiper.min.css'
      },
      {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min.js'
      }
    ]
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = ['locals', 'access', 'httpProxy'];

  exports.security = {
    csrf: {
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token'
    },
    xframe: {
      enable: false,
    },
  };

  exports.mysql = {
    // 单数据库信息配置
    clients: {
      credit: {
        host: '39.105.171.62',
        port: '3306',
        user: 'root',
        password: 'Zzn19921030@!',
        database: 'credit'
      },
      ly: {
        host: '39.105.171.62',
        port: '3306',
        user: 'root',
        password: 'Zzn19921030@!',
        database: 'blog'
      },
      docker: {
        host: '39.105.171.62',
        port: '3306',
        user: 'root',
        password: 'Zzn19921030@!',
        database: 'docker'
      }
    },
    default: {},
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };

  exports.swarm = {
    address: 'http://39.105.171.62:2375', // docker swarm master 地址
    ip: '39.105.171.62' // host ip for deploy project
  };

  exports.ssoAtome = {
    host: 'http://baidu.com/',
    appId: '1558',
    appKey: 'fdc800b373d97c17f523614e3b8af61c',
    cookieName: 'app'
  };

  return exports;
};