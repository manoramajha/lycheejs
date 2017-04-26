
lychee.define('studio.ui.element.modify.Font').requires([
	'studio.codec.FONT',
	'lychee.ui.entity.Input',
	'lychee.ui.entity.Select',
	'lychee.ui.entity.Slider'
]).includes([
	'lychee.ui.Element'
]).exports(function(lychee, global, attachments) {

	const _Element = lychee.import('lychee.ui.Element');
	const _Input   = lychee.import('lychee.ui.entity.Input');
	const _Select  = lychee.import('lychee.ui.entity.Select');
	const _Slider  = lychee.import('lychee.ui.entity.Slider');
	const _FONT    = lychee.import('studio.codec.FONT');



	/*
	 * HELPERS
	 */

	const _on_change = function() {

		let settings = this.value.__font;
		let value    = _FONT.encode({
			font: {
				family:  settings.family,
				color:   settings.color,
				size:    settings.size,
				style:   settings.style,
				outline: settings.outline
			}
		});


		if (value !== null) {

			this.value = value;
			this.trigger('change', [ this.value ]);
		}

	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.value = null;


		settings.label   = 'Modify';
		settings.options = [];


		_Element.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.setEntity('family', new _Input({
			type:  _Input.TYPE.text,
			value: 'Ubuntu Mono'
		}));

		this.setEntity('color', new _Input({
			type:  _Input.TYPE.text,
			value: '#ffffff'
		}));

		this.setEntity('size', new _Slider({
			max:   128,
			min:   8,
			step:  4,
			type:  _Slider.TYPE.horizontal,
			value: 16
		}));

		this.setEntity('style', new _Select({
			options: [ 'normal', 'bold', 'italic' ],
			value:   'normal'
		}));

		this.setEntity('outline', new _Slider({
			max:   4,
			min:   1,
			step:  1,
			type:  _Slider.TYPE.horizontal,
			value: 1
		}));


		this.getEntity('family').bind('change', function(value) {

			let font = this.value;
			if (font !== null) {
				font.__buffer.font.family = value;
				font.__font.family        = value;
			}

			_on_change.call(this);

		}, this);

		this.getEntity('color').bind('change', function(value) {

			let font = this.value;
			if (font !== null) {
				font.__buffer.font.color = value;
				font.__font.color        = value;
			}

			_on_change.call(this);

		}, this);

		this.getEntity('size').bind('change', function(value) {

			let font = this.value;
			if (font !== null) {
				font.__buffer.font.size = value;
				font.__font.size        = value;
			}

			_on_change.call(this);

		}, this);

		this.getEntity('style').bind('change', function(value) {

			let font = this.value;
			if (font !== null) {
				font.__buffer.font.style = value;
				font.__font.style        = value;
			}

			_on_change.call(this);

		}, this);

		this.getEntity('outline').bind('change', function(value) {

			let font = this.value;
			if (font !== null) {
				font.__buffer.font.outline = value;
				font.__font.outline        = value;
			}

			_on_change.call(this);

		}, this);


		this.setValue(settings.value);

		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		serialize: function() {

			let data = _Element.prototype.serialize.call(this);
			data['constructor'] = 'studio.ui.element.Font';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setValue: function(value) {

			value = value instanceof Font ? value : null;


			if (value !== null) {

				this.value = value;
				this.setOptions([]);


				let tmp1 = value.__font || null;
				if (tmp1 !== null) {

					this.getEntity('color').setValue(tmp1.color);
					this.getEntity('family').setValue(tmp1.family);
					this.getEntity('outline').setValue(tmp1.outline);
					this.getEntity('size').setValue(tmp1.size);
					this.getEntity('style').setValue(tmp1.style);

				}

				let tmp2 = value.__buffer || null;
				if (tmp2 !== null) {

					let tmp3 = value.__buffer.font || null;
					if (tmp3 === null) {
						value.__buffer.font = {};
					}

				} else {

					value.__buffer      = {};
					value.__buffer.font = {};

				}


				return true;

			}


			return false;

		}

	};


	return Composite;

});

