'use strict';

/*

  Quick Note

  ServiceBase
  ---------------------------------------------------------------------------------------------------------------------
  this.validate(obj)                          - Function that validates the object using indicative.
                                                  - Override recommended
                                                  - Used for pre data-manipulation
  this.sanitize(obj)                          - Function that sanitize the object using indicative.
                                                  - Override recommended
                                                  - Used for pre data-manipulation
  mapper(obj)                                 - Function that changes database object to public view object (DTO)
  mapperReverse(obj)                          - Function that changes public view object to database object (DTO)

  ServiceCrudBase
  ---------------------------------------------------------------------------------------------------------------------
  this.create(obj)                            - Function that creates new data entry
  this.getAll()                               - Function that returns all entries
  this.getById(_id)                           - Function that returns entry by _id
  this.update(_id, obj)                       - Function that updates entry by _id
  this.delete(_id)                            - Function that delete entry by _id
*/

const { $1 } = require('httpeace-node-core');

// Models
const $2 = new require('../models/$2');

module.exports = class $2Service extends $1 {
	constructor(context_) {
		super(context_, $2);
	}

	// TODO:: Implement Service Methods
};
