'use strict';
define([
], function(Windows, Grid) {

	var addMenu = {
		title: "add",
	};

	var updateMenu = {
		title: "update",
	};

	var deleteMenu = {
		title: "delete",
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
		addMenu: addMenu,
		updateMenu: updateMenu,
		deleteMenu: deleteMenu,
		contextMenu: contextMenu
	};
})
