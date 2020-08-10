/*
	Copyright (c) DeltaNedas 2020

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

(() => {

if (this.global.uiLib) {
	module.exports = this.global.uiLib;
	return;
}

const ui = {
	loadEvents: [],
	clickEvents: [],
	areas: {},
	effects: [],
	emptyRun: run(() => {}),
	errors: null,
	loaded: false
};

ui.onLoad = (func) => {
	if (ui.loaded) {
		func();
	} else {
		ui.loadEvents.push(func);
	}
}

ui.load = () => {
	var table;
	for (var i in ui.areas) {
		table = new Table();
		table.setFillParent(true);
		table.visible(boolp(() => !Vars.ui.minimapfrag.shown()));
		ui.areas[i].table = table;
		ui.areas[i].init(table);
	}

	const events = ui.loadEvents;
	ui.loaded = true;
	for (var i in events) {
		events[i]();
	}
	
	ui.loadEvents = [];

	var area;
	for (var i in ui.areas) {
		area = ui.areas[i];
		
		area.table.cells.sortComparing(func(cell => {
			const name = cell.get().name;
			return name[0] == '$' ? Core.bundle.get(name.substr(1)) : name;
		}));

		area.post(area.table);
		
		if (!area.customGroup) {
			Vars.ui.hudGroup.addChild(area.table);
		}
	}
};

ui.getIcon = (icon) => {
	
	if (typeof(icon) == "function") {
		icon = icon();
	}
	
	if (typeof(icon) == "string") {
		try {
			icon = Icon[icon]
		} catch (e) {
			icon = Core.atlas.find(icon);
		}
	}
	
	if (icon instanceof UnlockableContent) {
		icon = icon.icon(Cicon.full);
	}
	
	if (icon instanceof TextureRegion) {
		icon = new TextureRegionDrawable(icon);
	}
	
	return icon;
};

ui.addArea = (name, area) => {
	ui.areas[name] = area;
};

ui.addTable = (area, name, user) => {
	ui.onLoad(() => {
		try {
			const root = ui.areas[area].table;
			const table = new Table();
			root.add(table).name(name);
			root.row();
			if (ui.areas[area].added) {
				ui.areas[area].added(table);
			}
			user(table);
		} catch (e) {
			ui.showError("Failed to add table " + name + " to area " + area + ": " + e);
		}
	});
};

ui.addButton = (name, icon, clicked, user) => {
	ui.onLoad(() => {
		try {
			icon = ui.getIcon(icon);
			const cell = ui.areas.buttons.table.addImageButton(icon, Styles.clearTransi, 47.2, ui.emptyRun);
			cell.name(name);
			const button = cell.get();
			button.clicked(run(() => {
				
				try {
					clicked(button);
				} catch (e) {
					ui.showError("Error when clicking button " + name + ": " + e);
				}
			}));
			if (user) user(cell);
		} catch (e) {
			ui.showError("Failed to add button " + name + ": " + e);
		}
	});
};

ui.addMenuButton = (name, icon, clicked, user) => {
	ui.addTable("menu", name, t => {
		t.addImageTextButton(name, ui.getIcon(icon), run(clicked)).height(48).size(210, 84);
	});
};

ui.addEffect = (effect, visible) => {
	ui.effects.push({
		draw: effect,
		visible: visible || (() => {
			return !Vars.state.is(GameState.State.menu);
		})
	});
};

ui.click = (handler, world) => {
	ui.clickEvents.push({
		handler: handler,
		world: world
	});
	return ui.clickEvents.length - 1;
}

ui.showError = error => {
	Log.err(error);
	Core.app.post(run(() => {
		ui.errors.set(error);
		ui.errors.show();
	}));
};

ui.mobileAreaInput = (area, accepted, params) => {
	if (!Vars.mobile) return;

	
	if (typeof(params) != "function") {
		params = () => params;
	}

	area.update(run(() => {
		if (Core.scene.keyboardFocus == area) {
			Core.scene.keyboardFocus = null;

			const input = new Input.TextInput;
			input.multiline = true;
			input.accepted = cons(text => {
				
				area.text = text.replace(/\n/g, "\r");
				accepted(text);
			});
			Object.assign(input, params(area));

			Core.input.getTextInput(input);
		}
	}));
};

module.exports = ui;
this.global.uiLib = ui;

})();
