'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  
  async ssr() {
    const { ctx } = this;
    const images = await ctx.service.images.list();
    await this.ctx.render('app/index.js', { list: images });
  }

  async csr() {
    const result = this.service.article.getArtilceList();
    await this.ctx.renderClient('app/index.js', result);
  }

};