'use strict';
define([
	"Util",
	"Grid",
	"Api",
	"Model",
	"Buttons",
	"ContextMenu"
], function(Util, Grid, Api, Model, Buttons, ContextMenu) {

	// addUser
	var addForm = isc.DynamicForm.create({
		autoDraw: false,
		fields: Model.user
	});

	var addButton = isc.IButton.create({
		title: "send",
		click: function() {
			var user = addForm.getValidatedValues();
			if (user) {
				Api.addUserJSON(user);
				addWindow.hide();
				addForm.reset();
				Grid.userGrid.refresh();
			}
		}
	});

	var addWindow = isc.Window.create({
		width: 400, height: 300,
		autoDraw: false,
		autoCenter: true,
		isModal: true,
		showModalMask: true,
		items: [
			addForm,
			addButton
		]
	});

	Buttons.addButton.click = function() {
		addWindow.show();
	};

	ContextMenu.addMenu.click = function() {
		addWindow.show();
	};

	// updateUser
	var updateForm = isc.DynamicForm.create({
		autoDraw: false,
		setData: function() {
			var me = this;
			var record = Grid.userGrid.getSelectedRecord();
			var user = Util.filterProperty(me.fields, record);
			me.setValues(user);
		},
		fields: Model.user
	});

	var updateButton = isc.IButton.create({
		title: "send",
		click: function() {
			var user = updateForm.getValidatedValues();
			if (user) {
				Api.updateUser(user);
				updateWindow.hide();
				updateForm.reset();
				Grid.userGrid.refresh();
			}
		}
	});

	var updateWindow = isc.Window.create({
		title: "update",
		width: 400, height: 300,
		autoDraw: false,
		autoCenter: true,
		isModal: true,
		showModalMask: true,
		items: [
			updateForm,
			updateButton
		]
	});

	Buttons.updateButton.click = function() {
		updateForm.setData();
		updateWindow.show();
	};

	ContextMenu.updateMenu.click = function() {
		updateForm.setData();
		updateWindow.show();
	};

	// deleteUser
	var deleteOKButton = isc.IButton.create({
		title: "OK",
		click: function() {
			Grid.userGrid.deleteRecord();
			deleteWindow.hide();
		}
	});

	var deleteCancelButton = isc.IButton.create({
		title: "Cancel",
		click: function() {
			deleteWindow.hide();
		}
	});

	var deleteButtons = isc.HLayout.create({
		membersMargin: 10,
		members: [
			deleteOKButton,
			deleteCancelButton
		]
	});

	var deleteWindow = isc.Window.create({
		title: "delete?",
		autoSize: true,
		isModal: true,
		autoCenter: true,
		showModalMask: true,
		autoDraw: false,
		items: [
			deleteButtons
		]
	});

	Buttons.deleteButton.click = function() {
		deleteWindow.show();
	};

	ContextMenu.deleteMenu.click = function() {
		deleteWindow.show();
	};

	return {
		addWindow: addWindow,
		updateForm: updateForm,
		updateWindow: updateWindow,
		deleteWindow: deleteWindow
	}
});
