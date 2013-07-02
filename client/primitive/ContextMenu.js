'use strict';
define([
	"Windows",
	"Grid"
], function(Windows, Grid) {

	var addMenu = {
		title: "add",
		click: function() {
			Windows.addWindow.show();
		}
	};

	var updateMenu = {
		title: "update",
		enableIf: function() {
			return Grid.userGrid.getSelectedRecord() != null;
		},
		click: function() {
			Windows.updateForm.setData();
			Windows.updateWindow.show();
		}
	};

	var deleteMenu = {
		title: "delete",
		enableIf: function() {
			return Grid.userGrid.getSelectedRecord() != null;
		},
		click: function() {
			Windows.deleteWindow.show();
		}
	};

	var contextMenu = isc.Menu.create({
		width: 150,
		data: [
			addMenu,
			updateMenu,
			deleteMenu
		]
	});

	return {
		contextMenu: contextMenu
	};
})
