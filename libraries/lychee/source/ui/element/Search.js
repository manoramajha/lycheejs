
lychee.define('lychee.ui.element.Search').requires([
	'lychee.ui.entity.Input',
	'lychee.ui.entity.Select'
]).includes([
	'lychee.ui.Element'
]).exports(function(lychee, global, attachments) {

	const _Element = lychee.import('lychee.ui.Element');
	const _Input   = lychee.import('lychee.ui.entity.Input');
	const _Select  = lychee.import('lychee.ui.entity.Select');



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.data  = [];
		this.value = '';


		this.setData(settings.data);

		delete settings.data;


		settings.label    = 'Search';
		settings.options  = [];
		settings.relayout = true;


		_Element.call(this, settings);

		settings = null;



		/*
		 * INITIALIZATION
		 */

		let input = new _Input({
			type:  _Input.TYPE.text,
			value: ''
		});

		input.bind('change', function(value) {

			let select = this.getEntity('select');
			if (select !== null) {

				let filtered = this.data.filter(function(other) {
					return other.indexOf(value) !== -1;
				});

				if (filtered.length === 0) {

					select.setOptions([ '- No matches -' ]);
					this.trigger('relayout');

					this.trigger('change', [ value ]);

				} else {

					select.setOptions(filtered);
					this.trigger('relayout');

				}

			}

		}, this);

		let select = new _Select({
			options: this.data,
			value:   this.data[0],
			height:  this.height - 128
		});

		select.bind('change', function(value) {

			if (value !== '- No matches -') {
				this.value = value;
				this.trigger('change', [ value ]);
			}

		}, this);

		select.unbind('relayout');
		select.bind('relayout', function() {
			select.height = this.height - 128;
		}, this);

		this.setEntity('search', input);
		this.setEntity('select', select);

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let data = _Element.prototype.serialize.call(this);
			data['constructor'] = 'lychee.ui.element.Search';


			return data;

		},



		/*
		 * CUSTOM API
		 */

		setData: function(data) {

			data = data instanceof Array ? data : null;


			if (data !== null) {

				this.data = data.map(function(value) {
					return '' + value;
				}).sort();


				let select = this.getEntity('select');
				if (select !== null) {
					select.setOptions(this.data);
					this.trigger('relayout');
				}


				return true;

			}


			return false;

		}

	};


	return Composite;

});

