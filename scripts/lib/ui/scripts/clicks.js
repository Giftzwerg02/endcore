(() => {

const ui = this.global.uiLib;

const world = new Vec2();
Events.on(EventType.Trigger.update, run(() => {
	if (!Core.input.justTouched()) {
		return;
	}
	world.set(Core.input.mouseWorld());
	const pos = Core.input.mouse();
	const tile = Vars.world.tileWorld(world.x, world.y);
	const hasMouse = Core.scene.hasMouse();

	ui.clickEvents = ui.clickEvents.filter(event => {
		if (!event) return;
		if (event.world && hasMouse) return true;

		return event.handler(pos, tile, hasMouse);
	});
}));

})();
