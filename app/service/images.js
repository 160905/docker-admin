'use strict';

const Service = require('egg').Service;
class ImagesService extends Service {
  async list() {
    const {
      ctx,
      app,
      config: { swarm }
    } = this;
    try {
      const { data } = await app.curl(`${swarm.address}/images/json`, {
        dataType: 'json'
      });
      return ctx.helper.formatImages(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = ImagesService;
