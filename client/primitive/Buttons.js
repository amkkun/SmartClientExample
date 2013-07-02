'use strict';
define([
	"Grid",
	"Windows"
], function(Grid, Window) {

	var refreshButton = isc.IButton.create({
		title: "refresh",
		click: function() {
			Grid.userGrid.refresh();
		}
	});

	var addButton = isc.IButton.create({
		title: "add user",
		click: function() {
			Window.addWindow.show();
		}
	});

	var updateButton = isc.IButton.create({
		title: "update user",
		disabled: true,
		click: function() {
			Window.updateForm.setData();
			Window.updateWindow.show();
		}
	});

	var deleteButton = isc.IButton.create({
		title: "delete user",
		disabled: true,
		click: function() {
			Window.deleteWindow.show();
		}
	});

	return {
		refreshButton: refreshButton,
		addButton: addButton,
		updateButton: updateButton,
		deleteButton: deleteButton
	};
});
