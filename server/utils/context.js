const Joi = require('joi');

/**
 *
 * @param {Object} params - 需要被验证的 key-value
 * @param {Object} schema - 验证规则
 * @return Promise
 */
function validate(params = {}, schema = {}) {
  const ctx = this;
  const validator = Joi.validate(params, Joi.object().keys(schema), {
    allowUnknown: true,
  });
  if (validator.error) {
    ctx.throw(400, validator.error.message);
    return false;
  }
  return true;
}
// 绑定 app.context  ctx.func 直接调用
module.exports = {
  validate,
};
