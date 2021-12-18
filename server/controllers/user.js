const console = require('console');
const axios = require('axios');
const Joi = require('joi');
const { Op } = require('sequelize');

const { GITHUB } = require('../config');
const { comparePassword, encrypt } = require('../utils/bcrypt');
const { createToken } = require('../utils/token');
const { user: UserModel, ip: IpModel, sequelize } = require('../models');

/**
 * 读取 github 用户信息
 * @param {String} username - github 登录名
 */
async function getGithubInfo(username) {
  const result = await axios.get(`${GITHUB.fetch_user}${username}`);
  return result && result.data;
}

class UserController {
  /**
   * 查找用户
   * @param {*} params
   * @returns
   */
  static find(params) {
    return UserModel.findOne({ where: params });
  }

  /**
   * 创建用户
   * @param {*} data
   * @param {*} role
   * @returns
   */
  static createGithubUser(data, role = 2) {
    const { id, login, email } = data;
    return UserModel.create({
      id,
      username: login,
      role,
      email,
      github: JSON.stringify(data),
    });
  }

  /**
   * 初始化用户
   * @param {String} githubLoginName - github name
   */
  static async initGithubUser(githubLoginName) {
    try {
      const github = await getGithubInfo(githubLoginName);
      const temp = await UserController.find({ id: github.id });
      if (!temp) {
        UserController.createGithubUser(github, 1);
        console.log('Success Init GithubUser!');
      }
    } catch (error) {
      console.trace('create github user error ==============>', error.message);
    }
  }

  /**
   * 站内用户登录
   * @param {*} ctx
   */
  static async login(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      account: Joi.string().required(),
      password: Joi.string(),
    });
    if (validator) {
      const { account, password } = ctx.request.body;

      const user = await UserModel.findOne({
        where: {
          username: account,
        },
      });

      if (!user) {
        // ctx.client(403, '用户不存在')
        ctx.throw(403, '用户不存在');
      } else {
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          // ctx.client(403, '密码不正确')
          ctx.throw(403, '密码不正确');
        } else {
          const { id, role } = user;
          const token = createToken({
            username: user.username,
            userId: id,
            role,
          }); // 生成 token
          // ctx.client(200, '登录成功', { username: user.username, role, userId: id, token })
          ctx.body = {
            username: user.username,
            role,
            userId: id,
            token,
          };
        }
      }
    }
  }

  /**
   * 注册
   * @param {*} ctx
   */
  static async register(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    if (validator) {
      const { username, password, email } = ctx.request.body;
      const result = await UserModel.findOne({ where: { email } });
      if (result) {
        // ctx.client(403, '邮箱已被注册')
        ctx.throw(403, '邮箱已被注册');
      } else {
        const user = await UserModel.findOne({ where: { username } });
        if (user && !user.github) {
          ctx.throw(403, '用户名已被占用');
        } else {
          const saltPassword = await encrypt(password);
          await UserModel.create({ username, password: saltPassword, email });
          // ctx.client(200, '注册成功')
          ctx.status = 204;
        }
      }
    }
  }

  /**
   * 获取用户列表
   * @param {*} ctx
   */
  static async getUser(ctx) {
    const validator = ctx.validate(ctx.query, {
      username: Joi.string().allow(''),
      type: Joi.number(), // 检索类型 type = 1 github 用户 type = 2 站内用户 不传则检索所有
      'rangeDate[]': Joi.array(),
      page: Joi.string(),
      pageSize: Joi.number(),
    });

    if (validator) {
      const { page = 1, pageSize = 10, username, type } = ctx.query;
      const rangeDate = ctx.query['rangeDate[]'];
      const where = {
        role: { [Op.not]: 1 },
      };

      if (username) {
        where.username = {
          [Op.like]: `%${username}%`,
        };
      }

      if (type) {
        where.github = parseInt(type, 10) === 1 ? { [Op.not]: null } : null;
      }

      if (Array.isArray(rangeDate) && rangeDate.length === 2) {
        where.createdAt = { [Op.between]: rangeDate };
      }

      const result = await UserModel.findAndCountAll({
        where,
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize, 10),
        row: true,
        order: [['createdAt', 'DESC']],
      });

      ctx.body = result;
    }
  }

  /**
   * 更新用户信息
   * @param {*} userId
   * @param {*} data
   * @returns
   */
  static updateUserById(userId, data) {
    return UserModel.update(data, { where: { id: userId } });
  }

  /**
   * 更新用户信息
   * @param {*} ctx
   */
  static async updateUser(ctx) {
    const validator = ctx.validate(
      {
        ...ctx.params,
        ...ctx.request.body,
      },
      {
        userId: Joi.number().required(),
        notice: Joi.boolean(),
        disabledDiscuss: Joi.boolean(),
      }
    );

    if (validator) {
      const { userId } = ctx.params;
      const { notice, disabledDiscuss } = ctx.request.body;
      await UserController.updateUserById(userId, { notice, disabledDiscuss });
      if (typeof disabledDiscuss !== 'undefined') {
        await IpModel.update(
          { auth: !disabledDiscuss },
          { where: { userId: parseInt(userId, 10) } }
        );
      }
      ctx.status = 204;
    }
  }

  /**
   * 删除用户
   * @param {*} ctx
   */
  static async delete(ctx) {
    const validator = ctx.validate(ctx.params, {
      userId: Joi.number().required(),
    });

    if (validator) {
      await sequelize.query(
        `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${ctx.params.userId}`
      );
      await UserModel.destroy({ where: { id: ctx.params.userId } });
      ctx.status = 204;
    }
  }
}

module.exports = UserController;
