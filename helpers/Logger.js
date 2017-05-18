var path = require('path');
var fs = require('fs');
var winston = require('winston');
var base = path.dirname(require.main.filename) + '/log';

var models = {
  file: function(){
    var winstonLogger = new winston.Logger({
      transports: [
        new (require('winston-daily-rotate-file'))({
          name: 'file',
          datePattern: '.yyyy-MM-ddTHH',
          filename: base + '/log_file.log'
        })
      ]
    });
    return function(type, message){
      winstonLogger.log(type, message);
    };
  },
  console: function(){
    return function(type, message){
      console[type](message);
    };
  }
}

module.exports.print = null;

module.exports.init = function(env){
  env = env || 'development';

  try {
    fs.mkdirSync(base);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }

  if (env == 'development'){
    module.exports.print = models['console']()
  }else{
    module.exports.print = models['file']()
  }
}
