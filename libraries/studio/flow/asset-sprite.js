
(function(flow) {

	flow.then(function(oncomplete) {

		let entity = this.main.state.queryLayer('ui', 'project > select > 2');
		entity.setValue('/projects/immune');
		entity.trigger('change', [ entity.value ]);

		setTimeout(function() {
			oncomplete(true);
		}, 200);

	});

	flow.then(function(oncomplete) {

		let entity = this.main.state.queryLayer('ui', 'menu');
		entity.setValue('Asset');
		entity.trigger('change', [ entity.value ]);

		setTimeout(function() {
			oncomplete(true);
		}, 1000);

	});

	flow.then(function(oncomplete) {

		let entity = this.main.state.queryLayer('ui', 'asset > select > 0');
		entity.setValue('app/Test.png');
		entity.trigger('change', [ entity.value ]);

		setTimeout(function() {
			oncomplete(true);
		}, 200);

	});

	// flow.then(function(oncomplete) {

	// 	let entity = this.main.state.queryLayer('ui', 'asset > preview');
	// 	entity.trigger('relayout');

	// 	setTimeout(function() {
	// 		oncomplete(true);
	// 	}, 200);

	// });

	// flow.then(function(oncomplete) {

	// 	let entity = this.main.state.queryLayer('ui', 'asset > modify > color');
	// 	entity.setValue('#ff00ff');
	// 	entity.trigger('change', [ entity.value ]);

	// 	entity = this.main.state.queryLayer('ui', 'asset > modify > size');
	// 	entity.setValue(100);
	// 	entity.trigger('change', [ entity.value ]);

	// 	entity = this.main.state.queryLayer('ui', 'asset > modify > style');
	// 	entity.setValue('italic');
	// 	entity.trigger('change', [ entity.value ]);

	// 	entity = this.main.state.queryLayer('ui', 'asset > modify > spacing');
	// 	entity.setValue(16);
	// 	entity.trigger('change', [ entity.value ]);

	// 	setTimeout(function() {
	// 		oncomplete(true);
	// 	}, 200);

	// });

	// flow.then(function(oncomplete) {

	// 	let entity = this.main.state.queryLayer('ui', 'asset > preview');
	// 	entity.trigger('relayout');

	// 	oncomplete(true);

	// });

	flow.bind('error', function(error) {
		console.error(error);
	});

	flow.bind('complete', function() {
		console.info('Flow completed.');
	});

	flow.init();

})(new lychee.app.Flow(this.MAIN));

