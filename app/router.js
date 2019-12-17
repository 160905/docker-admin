'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.app.index.ssr);
  router.get('/csr', controller.app.index.csr);
  router.get('/login', controller.admin.admin.login);
  router.post('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  router.get('/admin(/.+)?', controller.admin.admin.home);

};