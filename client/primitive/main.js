'use strict';
require([
	"Buttons",
	"Grid"
], function(Buttons, Grid) {

	var buttons = isc.HLayout.create({
		membersMargin: 10,
		members: [
			Buttons.refreshButton,
			Buttons.addButton,
			Buttons.updateButton,
			Buttons.deleteButton
		]
	});

	var layout = isc.VLayout.create({
		membersMargin: 10,
		members: [
			buttons,
			Grid.userGrid
		]
	});
})
