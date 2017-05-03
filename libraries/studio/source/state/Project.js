
lychee.define('studio.state.Project').includes([
	'lychee.ui.State'
]).requires([
	'studio.data.Project',
	'studio.ui.element.modify.Project',
	'lychee.ui.Blueprint',
	'lychee.ui.Element',
	'lychee.ui.Layer',
	'lychee.ui.element.Search'
]).exports(function(lychee, global, attachments) {

	const _Project = lychee.import('studio.data.Project');
	const _State   = lychee.import('lychee.ui.State');
	const _BLOB    = attachments["json"].buffer;
	const _CACHE   = {};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(main) {

		_State.call(this, main);


		this.api = main.api || null;


		this.deserialize(_BLOB);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		serialize: function() {

			let data = _State.prototype.serialize.call(this);
			data['constructor'] = 'studio.state.Project';


			return data;

		},

		deserialize: function(blob) {

			_State.prototype.deserialize.call(this, blob);


			let menu = this.query('ui > menu');
			if (menu !== null) {

				menu.setHelpers([
					'refresh'
				]);

			}

			let notice = this.query('ui > notice');
			if (notice !== null) {
				notice.setOptions([]);
			}


			let select = this.query('ui > project > select');
			if (select !== null) {

				let api = this.api;
				if (api !== null) {

					let library_service = api.getService('library');
					let project_service = api.getService('project');

					if (library_service !== null) {

						library_service.bind('sync', function(data) {

							if (data instanceof Array) {

								let filtered = [].slice.call(this.data);

								data.map(function(library) {
									return library.identifier;
								}).forEach(function(value) {

									if (filtered.indexOf(value) === -1) {
										filtered.push(value);
									}

								});

								filtered = filtered.filter(function(value) {
									return value !== '/libraries/harvester';
								});

								this.setData(filtered);

							}

						}, select);

					}


					if (project_service !== null) {

						project_service.bind('sync', function(data) {

							if (data instanceof Array) {

								let filtered = [].slice.call(this.data);

								data.map(function(project) {
									return project.identifier;
								}).forEach(function(value) {

									if (filtered.indexOf(value) === -1) {
										filtered.push(value);
									}

								});

								this.setData(filtered);

							}

						}, select);

					}

				}


				select.bind('change', function(value) {

					if (/^\/libraries|projects\//g.test(value) === false) {
						value = '/projects/' + value.split('/').pop();
					}


					let project = new _Project(value);

					project.onload = function() {

						this.main.setProject(project);


						let modify = this.query('ui > project > modify');
						if (modify !== null) {
							modify.setProject(project);
							modify.setVisible(true);
						}

						let notice = this.query('ui > notice');
						if (notice !== null) {
							notice.setLabel('Project opened.');
							notice.setState('active');
						}

					}.bind(this);

					project.load();

				}, this);

			}


			let modify = this.query('ui > project > modify');
			if (modify !== null) {

				modify.bind('change', function(action) {

					if (action === 'save') {

						let notice = this.query('ui > notice');
						if (notice !== null) {
							notice.setLabel('Project saved.');
							notice.setState('active');
						}

					}

				}, this);

			}

		},

		enter: function(oncomplete, data) {

			let api = this.api;
			if (api !== null) {

				let library_service = api.getService('library');
				if (library_service !== null) {
					library_service.sync();
				}

				let project_service = api.getService('project');
				if (project_service !== null) {
					project_service.sync();
				}

			}


			_State.prototype.enter.call(this, oncomplete, data);

		}

	};


	return Composite;

});
