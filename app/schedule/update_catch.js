'use strict';

/**
 *   *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
 */

module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all' // 指定所有的 worker 都需要执行
    // 每三小时准点执行一次
    // cron: '0 0 */3 * * *',
  },
  // subscribe 是真正定时任务执行时被运行的函数
  async task(ctx) {
    const { data } = await ctx.curl(
      'https://api.douban.com/v2/movie/subject/30261964?apikey=0df993c66c0c636e29ecbb5344252a4a',
      {
        dataType: 'json'
      }
    );
    ctx.logger.info('定时任务缓存数据: success');
    ctx.app.cache = data;
  }
};
