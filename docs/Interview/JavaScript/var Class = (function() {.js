const isFunction = (n) => typeof n === "function";
const extendProperties = (base, extend, cb) => {
	for (let p in extend) {
		if (extend.hasOwnProperty(p)) {
			if (isFunction(cb)) {
				cb(p);
			} else {
				base.prototype[p] = extend[p];
			}
		}
	}
	return base;
};

const Class = (() => {
	function create(properties, parent) {
		function _instance() {
			if (isFunction(this.initialize)) this.initialize.apply(this, arguments);
		}
		function polymorph(thisFunction, parentFunction) {
			return function () {
				this.__parent = parentFunction;
				const output = thisFunction.apply(this, arguments);
				delete this.__parent;
				return output;
			};
		}
		if (parent) {
			_instance.prototype = new parent.constructor();
			extendProperties(_instance, parent);
		}

		extendProperties(_instance, properties, (p) => {
			_instance.prototype[p] =
				parent && isFunction(parent[p])
					? polymorph(properties[p], parent[p])
					: properties[p];
		});

		_instance.extend = function extend(properties) {
			return create(properties, this.prototype);
		};

		return _instance;
	}
	return { create };
})();

var Accommodation = Class.create({
	isLocked: true,
	isAlarmed: true,
	lock: function () {
		this.isLocked = true;
	},
	unlock: function () {
		this.isLocked = false;
	},
	initialize: function () {
		this.unlock();
	},
});

var House = Accommodation.extend({
	floors: 2,
	lock() {
		console.log("Number of floors locked:" + this.floors);
	},
});

var myAccommodation = new Accommodation();
console.log(myAccommodation instanceof Accommodation); // true
console.log(myAccommodation instanceof House); // false

var myHouse = new House();
console.log(myHouse instanceof House); // true
console.log(myHouse instanceof Accommodation); // true

console.log(myHouse.isLocked); // false
myHouse.lock(); // Number of floors locked:2
console.log(myHouse.isLocked); // false
