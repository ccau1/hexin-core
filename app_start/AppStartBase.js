'use strict';

const express = require('express');

module.exports = class AppStart {
  static get HANDLE_LIST_BEGINNING() { return true; }
  static get HANDLE_LIST_END() { return false; }

  constructor(appConfig) {
    //  create our express application
    appConfig.app = express();
    //  create an instance of router for api
    appConfig.router = express();
    //  set config
    this.appConfig = Object.assign(this.getBaseConfig(), appConfig);
    this.setConfig(this.appConfig);

    this.handleList = [];
    this.setHandlers(this.appConfig);
    this.setBaseHandlers(this.appConfig);
  }

  getBaseConfig() {
    return {
      app: express(),
      router: express(),
      baseAppStart: {
        disable: false,
      },
    };
  }

  setBaseHandlers(appConfig) {
    if (appConfig.baseAppStart.disable) {
      return false;
    }

    return true;
  }

  setConfig(appConfig) {
    throw new ReferenceError('AppStart must override setConfig(appConfig)');
  }

  setHandlers(appConfig) {
    throw new ReferenceError('AppStart must override setHandler(appConfig)');
  }

  handle(handle, addToBeginning = false) {
    if (addToBeginning) {
      this.handleList.unshift(handle);
    } else {
      this.handleList.push(handle);
    }
  }

  async init() {
    await this.doInit(this.appConfig, 'preInit');
    await this.doInit(this.appConfig, 'init');
    await this.doInit(this.appConfig, 'postInit');
  }

  async doInit(appConfig, methodName, index = 0) {
    if (!this.handleList[index]) {
      return true;
    }

    return new Promise((resolve, reject) => {
      this.handleList[index][methodName](async () => {
        await this.doInit(appConfig, methodName, ++index);
        resolve();
      }, appConfig);
    });
  }
};
