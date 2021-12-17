const bcrypt = require('bcrypt-nodejs');
const { SALT_WORK_FACTOR } = require('../config');

/**
 * @func encrypt - 加密
 * @param {String} - 密码
 */
exports.encrypt = (password) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) reject(password);
      bcrypt.hash(password, salt, null, (err2, hash) => {
        if (err2) resolve(password);
        resolve(hash);
      });
    });
  });

/**
 * @func comparePassword - 密码校验
 * @param {String} _password - 需要校验的密码
 * @param {String} hash - 加密后的密码
 */
exports.comparePassword = (_password, hash) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    bcrypt.compare(_password, hash, (err, isMatch) => {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
