
lychee.define('harvester.mod.Strainer').tags({
	platform: 'node'
}).requires([
]).exports(function(lychee, global, attachments) {



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

