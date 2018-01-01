'use strict';

/*

  This is a helper class to map an object from structure A to structure B. This is described by
  passing in the 'from' name and 'to' name.

  addMap                          - takes two arguments: to, from (optional). This returns a function that takes
                                    a mutating function. This function will be used whenever the same 'to' and 'from'
                                    is passed into .map()

  map                             - takes two arguments: to, from (optional). This returns a function that takes
                                    one parameter: obj. It then mutates the object using the function passed from
                                    .addMap() with the same 'to' and 'from'

  EXAMPLE:

    const mapper = new Mapper(this);

    mapper.addMap('list')(function(obj) {
      obj.mutate = 'this field is new';
      return obj;
    });

    let obj = {};
    mapper('list')(obj);

    console.log(obj);
    // output: {mutate: 'this field is new'}
*/

module.exports = class Mapper {
	constructor(ctxt) {
		this.context = ctxt;
		this.mapList = {};

		this.map = function(to = 'default', from = '') {
			const me = this;
			return function(obj) {
				return me.mapList[to + '_' + from](obj);
			};
		}.bind(this);

		this.setMap = function(to = 'default', from = '') {
			const me = this;
			return function(fn) {
				me.mapList[to + '_' + from] = fn.bind(ctxt);
			};
		}.bind(this);

		let MapInstance = this.map;
		MapInstance.mapList = this.mapList;

		MapInstance.map = this.map;
		MapInstance.setMap = this.setMap;

		return MapInstance;
	}
};
