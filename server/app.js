/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable global-require */
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const error = require('koa-json-error');
const logger = require('koa-logger');
const console = require('console');

const app = new Koa();

// context binding...
const context = require('./utils/context');

Object.keys(context).forEach((key) => {
  app.context[key] = context[key]; // 绑定上下文对象
});

// 中间件
const authHandler = require('./middlewares/authHandler');

app
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      formidable: {
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认20M
      },
    })
  )
  .use(
    error({
      postFormat: (e, { stack, ...rest }) =>
        process.env.NODE_ENV !== 'development' ? rest : { stack, ...rest },
    })
  )
  .use(authHandler)
  .use(logger());

// 路由
const loadRouter = require('./router');

loadRouter(app);

// 端口 回调(sequelize)
const { PORT } = require('./config');
const db = require('./models');

app.listen(PORT, () => {
  db.sequelize
    .sync({ force: false })
    .then(async () => {
      const initData = require('./initData');
      initData(); // 创建初始化数据
      console.log('sequelize connect success');
      console.log(`server listen on http://127.0.0.1:${PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
