module.exports = class MiddlewareManager {
  constructor(appConfig) {
    this.middlewares = [];
    this.appConfig = appConfig;
    this.handleMiddlewares(appConfig);
  }

  handleMiddlewares(appConfig) {
    throw new Error(
      'MiddlewareManager:: method handleMiddlewares must be overridden'
    );
  }

  middleware(middleware) {
    this.middlewares.push(middleware);
  }

  link(router) {
    this.middlewares.forEach(middleware => {
      router.use(middleware.middleware.bind(middleware));
    });
  }
};
