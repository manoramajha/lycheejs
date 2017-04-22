
lychee.define('game.app.entity.Vesicle').includes([
	'lychee.app.Entity'
]).exports(function(lychee, global, attachments) {

	const _Entity = lychee.import('lychee.app.Entity');
	let   _id     = 0;
	const _COLORS = {
		immune:  '#32afe5',
		virus:   '#d0494b',
		neutral: '#efefef'
	};



	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = Object.assign({}, data);


		this.id     = 'vesicle-' + _id++;
		this.team   = 'neutral';
		this.damage = 0;
		this.health = 100;

		this.__attacker = null;
		this.__health   = this.health;


		this.setHealth(settings.health);
		this.setTeam(settings.team);

		delete settings.health;
		delete settings.team;


		settings.collision = _Entity.COLLISION.A;
		settings.shape     = _Entity.SHAPE.circle;
		settings.radius    = 16;


		_Entity.call(this, settings);

		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			if (typeof blob.attacker === 'string') {
				this.__attacker = blob.attacker;
			}

			if (typeof blob.health === 'number') {
				this.__health = blob.health;
			}

		},

		serialize: function() {

			let data = _Entity.prototype.serialize.call(this);
			data['constructor'] = 'game.app.entity.Vesicle';

			let settings = data['arguments'][0];
			let blob     = (data['blob'] || {});


			if (this.team !== 'neutral') settings.team   = this.team;
			if (this.health !== 100)     settings.health = this.health;


			if (this.__attacker !== null) blob.attacker = this.__attacker;
			if (this.__health !== 100)    blob.health   = this.__health;


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		},

		render: function(renderer, offsetX, offsetY) {

			let position = this.position;
			let radius   = this.radius;
			let team     = this.team;


			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius + 2,
				_COLORS.neutral,
				true
			);

			renderer.drawCircle(
				position.x + offsetX,
				position.y + offsetY,
				radius,
				_COLORS[team],
				true
			);



			let tx = position.x + offsetX - 4;
			let ty = position.y + offsetY + 2;

			renderer.__ctx.font = '16px serif';
			renderer.__ctx.fillStyle = '#000000';
			renderer.__ctx.fillText(this.id.split('-')[1], tx, ty);

		},



		/*
		 * CUSTOM API
		 */

		damage: function(team, damage) {

			team   = typeof team === 'string'   ? team         : null;
			damage = typeof damage === 'number' ? (damage | 0) : null;


			if (team !== null && damage !== null) {

				if (team !== this.team) {

					this.health     = Math.max(0, this.health - damage);
					this.__attacker = team;


					if (this.health === 0) {

						this.health     = this.__health;
						this.team       = team;
						this.__attacker = null;

					}

					return true;

				}

			}


			return false;

		},

		setHealth: function(health) {

			health = typeof health === 'number' ? (health | 0) : null;


			if (health !== null) {

				this.health   = health;
				this.__health = health;

				return true;

			}


			return false;

		},

		setTeam: function(team) {

			team = typeof team === 'string' ? team : null;


			if (team !== null) {

				this.team = team;

				return true;

			}


			return false;

		},

		isAttackedBy: function(team) {

			team = typeof team === 'string' ? team : null;


			if (this.__attacker === team) {
				return true;
			}


			return false;

		}

	};


	return Composite;

});

