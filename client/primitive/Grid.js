'use strict';
define([
	"Api",
	"Model",
	"Buttons",
	"ContextMenu"
], function(Api, Model, Buttons, ContextMenu) {

	var userGrid = isc.ListGrid.create({
		width: 500, height: 400,
		fields: Model.user,
		contextMenu: ContextMenu.contextMenu,
		selectionChanged: function(record, state) {
			Buttons.updateButton.setEnabled(state);
			Buttons.deleteButton.setEnabled(state);
		},
		refresh: function() {
			Api.getUsers(function(data) {
				userGrid.setData(data);
			});
		},
		// TODO
		deleteRecord: function() {
			var record = userGrid.getSelectedRecord();
			Api.deleteUser(record.userId);
			this.refresh();
		}
	});

	Buttons.refreshButton.click = function() {
		console.log(this);
		console.log(arguments);
		userGrid.refresh();
	};

	ContextMenu.updateMenu.enableIf = function() {
		return userGrid.getSelectedRecord() != null;
	};

	ContextMenu.deleteMenu.enableIf = function() {
		return userGrid.getSelectedRecord() != null;
	};

	return {
		userGrid: userGrid,
	};
});
