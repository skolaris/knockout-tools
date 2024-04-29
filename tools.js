(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		//AMD. Register as an anonymous module.
		define(factory);
	}
	else if (typeof module === 'object' && module.exports) {
		//Node. Does not work with strict CommonJS, but only CommonJS-like environments that support module.exports like Node.
		module.exports = factory();
	}
	else {
		//Browser globals (root is window)
		root.knockoutTools = factory();
	}
}(typeof self !== 'undefined' ? self : this, function() {
	return {
		//returns a random GUID
		'getGuid': function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
				const r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);

				return v.toString(16);
			});
		},

		//Reads 'enable' and 'disable' properties of given params from KO component binding
		//and returns a computed observable indicating whether to enable the component (such as a textfield or a checkbox)
		'isComponentEnabled': function(params) {
			if (params.enable !== undefined && params.disable !== undefined)
				throw 'Cannot specify both \'enable\' and \'disable\' parameters';

			if (params.disable !== undefined)
				return ko.pureComputed(() => !ko.unwrap(params.disable));

			if (params.enable === undefined)
				return ko.pureComputed(() => true);

			return ko.isComputed(params.enable) ?
				params.enable :
				ko.pureComputed(() => ko.unwrap(params.enable));
		}
	};
}));
