
lychee.define('studio.ui.element.preview.Font').includes([
	'lychee.ui.Element'
]).exports(function(lychee, global, attachments) {

	const _Element = lychee.import('lychee.ui.Element');



	/*
	 * HELPERS
	 */

	const _render_buffer = function(renderer) {

		let font = this.font;
		if (font !== null && font.texture !== null) {

			if (this.__buffer !== null) {
				this.__buffer.resize(this.width - 2, this.height - 128);
			} else {
				this.__buffer = renderer.createBuffer(this.width - 2, this.height - 128);
			}


			renderer.clear(this.__buffer);
			renderer.setBuffer(this.__buffer);
			renderer.setAlpha(1.0);


			renderer.drawBox(
				0,
				0,
				this.__buffer.width,
				this.__buffer.height,
				'#32afe5',
				true
			);

			// TODO: render buffer contents

			renderer.setBuffer(null);
			this.__isDirty = false;

		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.font = null;

		this.__buffer  = null;
		this.__isDirty = true;


		settings.label   = 'Preview';
		settings.options = [];


		_Element.call(this, settings);


		this.setFont(settings.font);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		this.bind('relayout', function() {
			this.__isDirty = true;
		}, this);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		serialize: function() {

			let data = _Element.prototype.serialize.call(this);
			data['constructor'] = 'studio.ui.element.preview.Font';


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


			if (this.__isDirty === true) {
				_render_buffer.call(this, renderer);
			}


			if (alpha !== 1) {
				renderer.setAlpha(alpha);
			}

			if (this.__buffer !== null) {

				renderer.drawBuffer(
					x - hwidth,
					y - hheight + 64,
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

		setFont: function(font) {

			font = font instanceof Font ? font : null;


			if (font !== null) {

				this.font = font;
				this.setOptions([ 'Save' ]);
				this.__isDirty = true;

				return true;

			}


			return false;

		}

	};


	return Composite;

});

