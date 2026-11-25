/**
 * Visual hotspot picker for the "Interactive property guide" ACF layout.
 *
 * Renders the map image above the Hotspots repeater with one draggable marker
 * per row. Dragging a marker (or clicking on the map while a hotspot is
 * selected) writes the position into the hidden top/left % fields.
 */
(function ($) {
	if (typeof acf === 'undefined') return;

	var FIELDS = {
		map: 'map_image',
		repeater: 'hotspots',
		area: 'area',
		icon: 'icon',
		mobile: { top: 'top_mobile', left: 'left_mobile' },
		desktop: { top: 'top_desktop', left: 'left_desktop' }
	};

	function sub($scope, name) {
		return $scope.find('.acf-field[data-name="' + name + '"]').first();
	}

	function rowsOf($repeater) {
		return $repeater.find('.acf-row').not('.acf-clone').filter(function () {
			return $(this).closest('.acf-field[data-name="' + FIELDS.repeater + '"]').is($repeater);
		});
	}

	function getVal($row, name) {
		var v = sub($row, name).find('input').val();
		return v === '' || v === undefined ? null : parseFloat(v);
	}

	function setVal($row, name, value) {
		sub($row, name).find('input').val(value).trigger('change');
	}

	// Each mode falls back to the other one, same as the template.
	function position($row, mode) {
		var other = mode === 'desktop' ? 'mobile' : 'desktop';
		var top = getVal($row, FIELDS[mode].top);
		var left = getVal($row, FIELDS[mode].left);
		if (top === null) top = getVal($row, FIELDS[other].top);
		if (left === null) left = getVal($row, FIELDS[other].left);
		return { top: top === null ? 0 : top, left: left === null ? 0 : left };
	}

	function Picker($repeater) {
		this.$repeater = $repeater;
		this.$scope = $repeater.parent().closest('.acf-fields');
		this.mode = 'desktop';
		this.selected = 0;
		this.build();
		this.render();
		$repeater.data('hotspotPicker', this);
	}

	Picker.prototype.build = function () {
		var self = this;
		this.$el = $(
			'<div class="hs-picker">' +
				'<div class="hs-picker__bar">' +
					'<strong>Hotspot positions</strong>' +
					'<div class="hs-picker__modes">' +
						'<button type="button" class="button" data-mode="desktop">Desktop</button>' +
						'<button type="button" class="button" data-mode="mobile">Mobile</button>' +
					'</div>' +
				'</div>' +
				'<p class="hs-picker__help">Drag a marker to move it, or select a hotspot and click on the image. ' +
				'Mobile falls back to the desktop position until you move it in Mobile view.</p>' +
				'<div class="hs-picker__stage"><div class="hs-picker__canvas"><img alt="" /></div></div>' +
				'<p class="hs-picker__empty">Upload a map image to position the hotspots.</p>' +
			'</div>'
		);
		this.$canvas = this.$el.find('.hs-picker__canvas');
		this.$img = this.$canvas.find('img');
		this.$repeater.before(this.$el);

		this.$el.on('click', '[data-mode]', function () {
			self.mode = $(this).data('mode');
			self.render();
		});

		this.$canvas.on('click', function (e) {
			if ($(e.target).closest('.hs-marker').length) return;
			var $row = rowsOf(self.$repeater).eq(self.selected);
			if ($row.length) self.place($row, self.pointToPercent(e));
		});
	};

	Picker.prototype.pointToPercent = function (e) {
		var rect = this.$canvas[0].getBoundingClientRect();
		var clamp = function (n) { return Math.min(100, Math.max(0, Math.round(n * 10) / 10)); };
		return {
			left: clamp(((e.clientX - rect.left) / rect.width) * 100),
			top: clamp(((e.clientY - rect.top) / rect.height) * 100)
		};
	};

	Picker.prototype.place = function ($row, pos) {
		setVal($row, FIELDS[this.mode].top, pos.top);
		setVal($row, FIELDS[this.mode].left, pos.left);
		this.render();
	};

	Picker.prototype.select = function (index) {
		this.selected = index;
		var $rows = rowsOf(this.$repeater);
		$rows.removeClass('hs-row--active').eq(index).addClass('hs-row--active');
		this.$canvas.find('.hs-marker').removeClass('is-active').eq(index).addClass('is-active');
	};

	Picker.prototype.render = function () {
		var self = this;
		var src = sub(this.$scope, FIELDS.map).find('.acf-image-uploader img').attr('src');

		this.$el.toggleClass('is-mobile', this.mode === 'mobile');
		this.$el.toggleClass('has-image', !!src);
		this.$el.find('[data-mode]').each(function () {
			$(this).toggleClass('button-primary', $(this).data('mode') === self.mode);
		});
		if (this.$img.attr('src') !== src) this.$img.attr('src', src || '');

		this.$canvas.find('.hs-marker').remove();
		rowsOf(this.$repeater).each(function (index) {
			var $row = $(this);
			var pos = position($row, self.mode);
			var name = sub($row, FIELDS.area).find('input').val() || 'Hotspot ' + (index + 1);
			var icon = sub($row, FIELDS.icon).find('.acf-image-uploader img').attr('src');

			var $marker = $('<div class="hs-marker" />')
				.css({ top: pos.top + '%', left: pos.left + '%' })
				.attr('title', name + ' (' + pos.top + '%, ' + pos.left + '%)')
				.append($('<span class="hs-marker__icon" />').append(icon ? $('<img alt="" />').attr('src', icon) : String(index + 1)))
				.append($('<span class="hs-marker__label" />').text(name));

			self.bindDrag($marker, $row, index);
			self.$canvas.append($marker);
		});

		this.select(Math.min(this.selected, Math.max(0, rowsOf(this.$repeater).length - 1)));
	};

	Picker.prototype.bindDrag = function ($marker, $row, index) {
		var self = this;
		$marker.on('pointerdown', function (e) {
			e.preventDefault();
			self.select(index);
			var el = $marker[0];
			el.setPointerCapture(e.pointerId);

			var move = function (ev) {
				var pos = self.pointToPercent(ev);
				$marker.css({ top: pos.top + '%', left: pos.left + '%' });
				$marker.data('pos', pos);
			};
			var up = function () {
				el.removeEventListener('pointermove', move);
				el.removeEventListener('pointerup', up);
				if ($marker.data('pos')) self.place($row, $marker.data('pos'));
			};
			el.addEventListener('pointermove', move);
			el.addEventListener('pointerup', up);
		});
	};

	// Wire up every Hotspots repeater, including ones in newly added layouts.
	var timer;
	function refresh() {
		clearTimeout(timer);
		timer = setTimeout(function () {
			$('.acf-field[data-name="' + FIELDS.repeater + '"]').each(function () {
				var $repeater = $(this);
				if ($repeater.closest('.acf-clone').length) return;
				var picker = $repeater.data('hotspotPicker');
				picker ? picker.render() : new Picker($repeater);
			});
		}, 50);
	}

	acf.addAction('ready', refresh);
	acf.addAction('append', refresh);
	acf.addAction('remove', function () { setTimeout(refresh, 300); });
	acf.addAction('sortstop', refresh);

	// Re-render when the map image, an icon or an area name changes.
	$(document).on('change input', [
		'.acf-field[data-name="' + FIELDS.map + '"] input',
		'.acf-field[data-name="' + FIELDS.icon + '"] input',
		'.acf-field[data-name="' + FIELDS.area + '"] input'
	].join(','), refresh);

	// Clicking into a row selects its marker.
	$(document).on('focusin click', '.acf-field[data-name="' + FIELDS.repeater + '"] .acf-row', function () {
		var $repeater = $(this).closest('.acf-field[data-name="' + FIELDS.repeater + '"]');
		var picker = $repeater.data('hotspotPicker');
		if (picker) picker.select(rowsOf($repeater).index(this));
	});
})(jQuery);
