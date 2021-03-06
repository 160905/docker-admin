'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index.ssr);
  router.get('/csr', controller.index.index.csr);
  router.get('/list', controller.index.index.list);
  router.get('/about', controller.index.index.about);
  router.get('/category', controller.category.category.index);
  router.get('/login', controller.admin.admin.login);
  router.get('/about', controller.admin.admin.login);
  router.post('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  router.get('/admin(/.+)?', controller.admin.admin.home);

  router.get('/docker', controller.docker.images.list);
};