
lychee.define('studio.state.Asset').includes([
	'lychee.ui.State'
]).requires([
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
	const _BLOB    = attachments["json"].buffer;



	/*
	 * HELPERS
	 */

	const _on_change = function(value) {

		let layer     = this.queryLayer('ui', 'asset');
		let modify    = this.queryLayer('ui', 'asset > modify');
		let preview   = this.queryLayer('ui', 'asset > preview');
		let project   = this.main.project;
		let extension = value.split('.').pop();
		let namespace = value.split('/')[0];


		if (modify !== null) {
			layer.removeEntity(modify);
		}

		if (preview !== null) {
			layer.removeEntity(preview);
		}


		if (extension === 'fnt') {

			let asset = new Font(project.identifier + '/source/' + value);

			asset.onload = function() {

				let modify = new _modify.Font({
					width:  320,
					height: 620,
					font:   asset
				});

				let preview = new _preview.Font({
					width:  400,
					height: 620,
					font:   asset
				});

				modify.bind('change', function(value) {

					asset.texture    = value.texture;
					asset.baseline   = value.baseline;
					asset.charset    = value.charset;
					asset.kerning    = value.kerning;
					asset.spacing    = value.spacing;
					asset.lineheight = value.lineheight;

					asset.__buffer   = value.__buffer;
					asset.__font     = value.__font;

					preview.trigger('relayout');

				}, this);

				layer.setEntity('modify',  modify);
				layer.setEntity('preview', preview);
				layer.trigger('relayout');

			}.bind(this);

			asset.load();

		} else if (extension === 'json' && /^(app|entity|ui)$/g.test(namespace)) {

			// TODO: Config support (or Sprite support)


		} else if (extension === 'png') {

			// TODO: Sprite support

		} else if (extension === 'msc') {

			// TODO: Music support

		} else if (extension === 'snd') {

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

