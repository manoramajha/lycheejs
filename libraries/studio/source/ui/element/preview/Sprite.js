
lychee.define('studio.ui.element.preview.Sprite').requires([
	'lychee.app.Entity',
	'lychee.app.Sprite'
]).includes([
	'lychee.ui.Element'
]).exports(function(lychee, global, attachments) {

	const _Element = lychee.import('lychee.ui.Element');
	const _Entity  = lychee.import('lychee.app.Entity');
	const _Sprite  = lychee.import('lychee.app.Sprite');



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.value = null;

		this.__sprite = new _Sprite();


		settings.label   = 'Preview';
		settings.options = [];


		_Element.call(this, settings);


		this.setValue(settings.value);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.bind('relayout', function() {
			// TODO: Reset offset
		}, this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		serialize: function() {

			let data = _Element.prototype.serialize.call(this);
			data['constructor'] = 'studio.ui.element.preview.Sprite';


			return data;

		},

		render: function(renderer, offsetX, offsetY) {

			if (this.visible === false) return;

			_Element.prototype.render.call(this, renderer, offsetX, offsetY);


			let alpha    = this.alpha;
			let position = this.position;
			let x        = position.x + offsetX;
			let y        = position.y + offsetY;
			let hwidth   = (this.width  - 2) / 2;
			let hheight  = (this.height - 2) / 2;


			// if (this.__isDirty === true) {
			// 	_render_buffer.call(this, renderer);
			// }


			if (alpha !== 1) {
				renderer.setAlpha(alpha);
			}

			if (this.__buffer !== null) {

				renderer.drawBuffer(
					x - hwidth  + 16,
					y - hheight + 80,
					this.__buffer
				);

			}

			if (alpha !== 1) {
				renderer.setAlpha(1.0);
			}

		},



		/*
		 * CUSTOM API
		 */

		setValue: function(value) {

			value = value instanceof Object ? value : null;


			if (value !== null) {

				this.value = value;
				this.setOptions([ 'Save' ]);


				let buffer    = value.config.buffer;
				let s_shape   = typeof buffer.shape === 'number'  ? buffer.shape  : null;
				let s_width   = typeof buffer.width === 'number'  ? buffer.width  : null;
				let s_height  = typeof buffer.height === 'number' ? buffer.height : null;
				let s_depth   = typeof buffer.depth === 'number'  ? buffer.depth  : null;
				let s_radius  = typeof buffer.radius === 'number' ? buffer.radius : null;
				let s_texture = value.texture instanceof Texture  ? value.texture : null;
				let s_states  = buffer.states instanceof Object   ? buffer.states : null;
				let s_map     = buffer.map instanceof Object      ? buffer.map    : null;


				if (s_texture !== null) {
					this.__sprite.setTexture(s_texture);
				}

				if (s_states !== null && s_map !== null) {
					this.__sprite.setStates(s_states);
					this.__sprite.setMap(s_map);
				}

				if (s_shape !== null) {

					if (lychee.enumof(_Entity.SHAPE, s_shape) === true) {
						this.__sprite.setShape(s_shape);
					}

				}

				if (s_width !== null) {
					this.__sprite.width = s_width;
				}

				if (s_height !== null) {
					this.__sprite.height = s_height;
				}

				if (s_depth !== null) {
					this.__sprite.depth = s_depth;
				}

				if (s_radius !== null) {
					this.__sprite.radius = s_radius;
				}


				return true;

			}


			return false;

		}

	};


	return Composite;

});

