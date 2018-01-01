const path = require('path');
const pluralize = require('pluralize');

const modelGenerator = require('./templates/model/generator');
const controllerGenerator = require('./templates/controller/generator');
const serviceGenerator = require('./templates/service/generator');
const appStartGenerator = require('./templates/app_start/generator');

module.exports = function(plop) {
  module.exports.setHelpers(plop);
  module.exports.setPrompts(plop);
  module.exports.setGenerators(plop);
};

module.exports.setHelpers = function(plop) {
  plop.addHelper('absPath', val => path.resolve(plop.getPlopfilePath(), val));
  plop.addHelper('pluralize', val => pluralize(val, 2));
};

module.exports.setPrompts = function(plop) {
  // adding a custom inquirer prompt type
  // plop.addPrompt('directory', require('inquirer-directory'));
};

module.exports.setGenerators = function(plop) {
  // create your generators here
  plop.setGenerator('Model', {
    description: 'Application Model',
    prompts: modelGenerator.prompts,
    actions: modelGenerator.actions
  });

  plop.setGenerator('Service', {
    description: 'Application Service',
    prompts: serviceGenerator.prompts,
    actions: serviceGenerator.actions
  });

  plop.setGenerator('Controller', {
    description: 'Application Controller',
    prompts: controllerGenerator.prompts,
    actions: controllerGenerator.actions
  });

  plop.setGenerator('MSC', {
    description: 'Application Model, Service & Controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        validate: value => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        }
      },
      {
        type: 'confirm',
        name: 'wantCrud',
        message: 'Do you want CRUD?'
      }
    ],
    actions: data => [
      ...modelGenerator.actions(data),
      ...serviceGenerator.actions(data),
      ...controllerGenerator.actions(data)
    ]
  });

  plop.setGenerator('App_Start', {
    description: 'Application App_Start',
    prompts: appStartGenerator.prompts,
    actions: appStartGenerator.actions
  });
};
