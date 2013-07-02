'use strict';
define([
], function() {

	var refreshButton = isc.IButton.create({
		title: "refresh",
	});

	var addButton = isc.IButton.create({
		title: "add user",
	});

	var updateButton = isc.IButton.create({
		title: "update user",
		disabled: true,
	});

	var deleteButton = isc.IButton.create({
		title: "delete user",
		disabled: true,
	});

	return {
		refreshButton: refreshButton,
		addButton: addButton,
		updateButton: updateButton,
		deleteButton: deleteButton
	};
});
