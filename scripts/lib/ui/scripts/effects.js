(() => {

const ui = this.global.uiLib;

ui.onLoad(() => {
	const table = extend(Table, {
		draw() {
			const w = Core.graphics.width, h = Core.graphics.height;
			const prev = Draw.scl;
			Draw.scl = 1;

			for (var i in ui.effects) {
				var effect = ui.effects[i];
				if (effect.visible()) {
					effect.draw(w, h);
				}
			}

			Draw.scl = prev;
		}
	});

	ui.areas.effects.table.add(table).name("effect");
});

})();
