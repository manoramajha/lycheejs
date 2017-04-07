
lychee.define('harvester.mod.Strainer').tags({
	platform: 'node'
}).requires([
]).supports(function(lychee, global) {

	if (typeof global.require === 'function') {

		try {

			global.require('child_process');

			return true;

		} catch (err) {

		}

	}


	return false;

}).exports(function(lychee, global, attachments) {



	/*
	 * IMPLEMENTATION
	 */

	const Module = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			return {
				'reference': 'harvester.mod.Strainer',
				'arguments': []
			};

		},



		/*
		 * CUSTOM API
		 */

		can: function(project) {

			return false;

		},

		process: function(project) {

			// XXX: Implement Me

		}

	};


	return Module;

});

