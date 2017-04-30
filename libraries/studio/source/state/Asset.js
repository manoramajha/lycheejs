
lychee.define('studio.state.Asset').includes([
	'lychee.ui.State'
]).requires([
	'studio.codec.FONT',
	'studio.ui.element.modify.Font',
//	'studio.ui.element.modify.Music',
//	'studio.ui.element.modify.Sound',
//	'studio.ui.element.modify.Sprite',
	'studio.ui.element.preview.Font',
//	'studio.ui.element.preview.Music',
//	'studio.ui.element.preview.Sound',
//	'studio.ui.element.preview.Sprite',
	'lychee.ui.Blueprint',
	'lychee.ui.Element',
	'lychee.ui.Layer',
	'lychee.ui.element.Search'
]).exports(function(lychee, global, attachments) {

	const _State   = lychee.import('lychee.ui.State');
	const _modify  = lychee.import('studio.ui.element.modify');
	const _preview = lychee.import('studio.ui.element.preview');
	const _FONT    = lychee.import('studio.codec.FONT');
	const _BLOB    = attachments["json"].buffer;



	/*
	 * HELPERS
	 */

	const _update_view = function(type, asset) {

		let layer   = this.queryLayer('ui', 'asset');
		let modify  = this.queryLayer('ui', 'asset > modify');
		let preview = this.queryLayer('ui', 'asset > preview');


		if (!(modify instanceof _modify[type])) {

			layer.removeEntity(modify);

			modify = null;
			modify = new _modify[type]({
				width:   320,
				height:  620,
				value:   asset,
				visible: true
			});

			modify.bind('change', function(value) {

				preview.setValue(value);

				setTimeout(function() {
					preview.trigger('relayout');
				}, 200);

			}, this);

			layer.setEntity('modify', modify);

		} else {

			modify.visible = true;
			modify.setValue(asset);

		}


		if (!(preview instanceof _preview[type])) {

			layer.removeEntity(preview);

			preview = null;
			preview = new _preview[type]({
				width:   400,
				height:  620,
				value:   asset,
				visible: true
			});

			layer.setEntity('preview', preview);

		} else {

			preview.visible = true;
			preview.setValue(asset);

			setTimeout(function() {
				preview.trigger('relayout');
			}, 200);

		}


		layer.trigger('relayout');

	};

	const _on_change = function(value) {

		let that    = this;
		let project = this.main.project;
		let path    = project.identifier + '/source/' + value;
		let ext     = value.split('.').pop();
		let ns      = value.split('/')[0];


		if (ext === 'fnt') {

			let asset = new Font(path);

			asset.onload = function(result) {
				_update_view.call(that, 'Font', asset);
			}.bind(this);

			asset.load();

		} else if (ext === 'png' || (ext === 'json' && /^(app|entity|ui)$/g.test(ns))) {

			let tmp   = path.split('.');
			let asset = {
				texture: null,
				config:  null
			};

			if (ext === 'png') {

				tmp[tmp.length - 1] = 'json';
				asset.texture = new Texture(path);
				asset.config  = new Config(tmp.join('.'));

			} else if (ext === 'json') {

				tmp[tmp.length - 1] = 'png';
				asset.texture = new Texture(tmp.join('.'));
				asset.config  = new Config(path);

			}


			asset.texture.onload = function() {

				asset.config.onload = function() {
					_update_view.call(that, 'Sprite', asset);
				};

				asset.config.load();

			};

			asset.texture.load();

		} else if (ext === 'json') {

			// TODO: Config support

		} else if (ext === 'msc') {

			// TODO: Music support

		} else if (ext === 'snd') {

			// TODO: Sound support

		}

	};



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
			data['constructor'] = 'studio.state.Asset';


			return data;

		},

		deserialize: function(blob) {

			_State.prototype.deserialize.call(this, blob);


			this.queryLayer('ui', 'asset > select').bind('change', _on_change, this);


			let modify  = this.queryLayer('ui', 'asset > modify');
			let preview = this.queryLayer('ui', 'asset > preview');

			modify.bind('change', function(value) {

				preview.setValue(value);

				setTimeout(function() {
					preview.trigger('relayout');
				}, 200);

			}, this);

		},

		enter: function(oncomplete, data) {

			let project = this.main.project;
			let select  = this.queryLayer('ui', 'asset > select');

			if (project !== null && select !== null) {

				let filtered = [];
				let assets   = project.getAssets();

				assets.forEach(function(asset) {

					let ext  = asset.split('.').pop();
					let path = asset.split('.').slice(0, -1).join('.');
					let map  = assets.indexOf(path + '.json');

					if (ext === 'png' && map !== -1) {
						filtered.push(path + '.png');
					} else if (ext === 'fnt') {
						filtered.push(path + '.fnt');
					} else if (ext === 'msc') {
						filtered.push(path + '.msc');
					} else if (ext === 'snd') {
						filtered.push(path + '.snd');
					}

				});

				select.setData(filtered);

			}


			_State.prototype.enter.call(this, oncomplete, data);

		}

	};


	return Composite;

});

