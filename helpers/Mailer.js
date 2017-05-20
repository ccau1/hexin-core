'use strict';

const mailer = require('nodemailer');

module.exports.client = null;

module.exports.config = {};

module.exports.connect = function (mail) {
  const transporter = mailer.createTransport(mail);

  if (transporter) {
    console.info('Mailer in connected');
    // TODO:: find a place to put all app global configs (not in base)
    this.client = transporter;
    this.config = mail;
  } else {
    throw new Error('nodemailer:: createTransport failed');
  }
}
