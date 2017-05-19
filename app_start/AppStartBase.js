'use strict';

const express = require('express');
const HandleError = require('../helpers/HandleError');

module.exports = class AppStart {
  static get HANDLE_LIST_BEGINNING() { return true; }
  static get HANDLE_LIST_END() { return false; }

  constructor(appConfig: Object) {
    //  create our express application
    appConfig.app = express();
    //  create an instance of router for api
    appConfig.router = express();
    //  set config
    this.setConfig(appConfig);
    this.appConfig = Object.assign(this.getBaseConfig(), appConfig);

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

  setConfig(appConfig: Object) {
    throw new HandleError({message: 'AppStart must override setConfig(appConfig)'});
  }

  setHandlers(appConfig: Object) {
    throw new HandleError({message: 'AppStart must override setHandler(appConfig)'});
  }

  handle(handle, addToBeginning = false) {
    if (addToBeginning) {
      this.handleList.unshift(handle);
    } else {
      this.handleList.push(handle);
    }
  }

  init() {
    this.handleList.forEach(handle => {
      handle.init();
    });
    this.handleList.forEach(handle => {
      handle.postInit();
    });
  }
};
