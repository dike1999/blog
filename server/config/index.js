const config = {
  PORT: 6060, // 启动端口
  ADMIN_GITHUB_LOGIN_NAME: 'dike1999', // 博主的 github 登录的账户名 user
  GITHUB: {
    client_id: '501cd34ee76a583f1381',
    client_secret: '4b7f83df947870a8ee3666437ad07752cc80dc43',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2 因为访问速度的原因，init常会报错
    fetch_user: 'https://api.github.com/users/', // fetch user url https://api.github.com/users/gershonv
  },
  EMAIL_NOTICE: {
    // 邮件通知服务
    // detail: https://nodemailer.com/
    enable: true, // 开关
    transporterConfig: {
      host: 'smtp.163.com',
      port: 465,
      // TZXDGCMBYNJLIJDZ
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'coderdi@163.com', // generated ethereal user
        pass: 'TZXDGCMBYNJLIJDZ', // generated ethereal password 授权码 而非 密码
      },
    },
    subject: 'CoderDi的博客 - 您的评论获得新的回复!', // 主题
    text: '您的评论获得新的回复!',
    WEB_HOST: 'http://101.201.140.172', // email callback url
  },
  TOKEN: {
    secret: 'di-test', // secret is very important!
    expiresIn: '24h', // token 有效期
  },
  DATABASE: {
    database: 'blog',
    user: 'blog',
    password: 'Blog@123',
    options: {
      host: '101.201.140.172', // 连接的 host 地址
      dialect: 'mysql', // 连接到 mysql
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: false, // 默认不加时间戳
        freezeTableName: true, // 表名默认不加 s
      },
      timezone: '+08:00',
    },
  },
};

module.exports = config;
