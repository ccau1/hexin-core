module.exports = class MiddlewareBase {
  async middleware(req, res, next) {
    throw new Error('MiddlewareBase:: method middleware must be overridden');
  }
};
