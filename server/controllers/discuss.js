/* eslint-disable no-param-reassign */
const Joi = require('joi');
const console = require('console');

const { EMAIL_NOTICE } = require('../config');
const { getEmailData, sendEmail } = require('../utils/email');

const {
  article: ArticleModel,
  comment: CommentModel,
  reply: ReplyModel,
  user: UserModel,
  ip: IpModel,
  sequelize,
} = require('../models');

/**
 * 邮件通知
 * userId - 添加评论的用户id
 */
async function sendingEmail(articleId, commentList, commentId, userId) {
  const article = await ArticleModel.findOne({
    where: { id: articleId },
    attributes: ['id', 'title'],
  });
  const target = commentList.rows.find((d) => d.id === parseInt(commentId, 10));

  const { emailList, html } = getEmailData(article, target, userId);

  Promise.all(emailList.map((receiver) => sendEmail({ receiver, html })))
    .then((res) => {
      console.log('success to send email: ', res);
    })
    .catch((e) => {
      console.log('fail to send email: ', e);
    });
}

class DiscussController {
  static async create(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      articleId: Joi.number().required(), // 文章 id
      userId: Joi.number().required(), // 用户 id
      content: Joi.string().required(), // 评论 、回复的内容
      commentId: Joi.number(), // 回复相应的评论
    });

    if (validator) {
      const { articleId, userId, content } = ctx.request.body;
      let { commentId } = ctx.request.body;

      const user = await UserModel.findOne({ where: { id: userId } });
      const ipInfo = await IpModel.findOne({
        where: { ip: ctx.request.ip },
        attributes: ['auth'],
      });

      if (ipInfo && !ipInfo.auth) {
        ctx.status = 401;
        ctx.response.body = {
          message: '该 IP 已被拉入黑名单',
        };
      } else if (user.disabledDiscuss) {
        ctx.status = 401;
        ctx.response.body = {
          message: '您已被禁言，请文明留言!',
        };
      } else {
        const { ip } = ctx.request;
        if (!commentId) {
          // 添加评论
          const comment = await CommentModel.create({
            userId,
            articleId,
            content,
          });
          commentId = comment.id;
        } else {
          // 添加回复
          await ReplyModel.create({
            userId,
            articleId,
            content,
            commentId,
          });
        }
        await IpModel.findOrCreate({ where: { ip }, defaults: { userId, ip } });
        const list = await DiscussController.fetchDiscussList(articleId);

        if (EMAIL_NOTICE.enable) {
          sendingEmail(articleId, list, commentId, userId);
        }

        ctx.body = list;
      }
    }
  }

  static async deleteComment(ctx) {
    const validator = ctx.validate(ctx.params, {
      commentId: Joi.number().required(),
    });

    if (validator) {
      const { commentId } = ctx.params;
      await sequelize.query(
        `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.id=${commentId}`
      );
      // ctx.client(200)
      ctx.status = 204;
    }
  }

  static async deleteReply(ctx) {
    const validator = ctx.validate(ctx.params, {
      replyId: Joi.number().required(),
    });

    if (validator) {
      const { replyId } = ctx.params;
      await ReplyModel.destroy({ where: { id: replyId } });
      ctx.status = 204;
    }
  }

  static async fetchDiscussList(articleId) {
    const data = await CommentModel.findAndCountAll({
      where: { articleId },
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: ReplyModel,
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: UserModel,
              as: 'user',
              attributes: { exclude: ['updatedAt', 'password'] },
            },
          ],
        },
        {
          model: UserModel,
          as: 'user',
          attributes: { exclude: ['updatedAt', 'password'] },
        },
      ],
      row: true,
      order: [
        ['createdAt', 'DESC'],
        [ReplyModel, 'createdAt', 'ASC'],
      ],
    });

    // 格式化 github
    data.rows.forEach((comment) => {
      comment.user.github = JSON.parse(comment.user.github);
      comment.replies.forEach((reply) => {
        reply.user.github = JSON.parse(reply.user.github);
      });
    });

    return data;
  }
}

module.exports = DiscussController;
