(() => {

const ui = this.global.uiLib;

ui.onLoad(() => {
	const dialog = extendContent(FloatingDialog, "$ui.error", {
		set(msg) {
			this.cont.cells.get(1).get().text = msg;
		}
	});

	const table = dialog.cont;
	table.add("$error.title");
	table.row();
	table.add("Success").size(500, 300).get().wrap = true;

	dialog.addCloseButton();
	ui.errors = dialog;
});

})();
