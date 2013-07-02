define([
	"primitive-util",
	"primitive-grid",
	"primitive-api",
	"primitive-model"
], function(Util, Grid, Api, Model) {

	isc.Window.create({
		ID: "formWindow",
		width: 400, height: 300,
		autoDraw: false,
		autoCenter: true,
		isModal: true,
		showModalMask: true,
		items: [
			isc.DynamicForm.create({
				ID: "userForm",
				autoDraw: false,
				send: function() {
					var user = this.getValidatedValues();
					if (user) {
						Api.addUserJSON(user);
						return true;
					} else {
						return false;
					}
				},
				fields: Model.user
			}),
			isc.IButton.create({
				ID: "sendButton",
				title: "send",
				click: function() {
					if (userForm.send()) {
						formWindow.hide();
						userForm.reset();
						Grid.userList.refresh();
					}
				}
			})
		]
	})

	isc.Window.create({
		ID: "updateWindow",
		title: "update",
		width: 400, height: 300,
		autoDraw: false,
		autoCenter: true,
		isModal: true,
		showModalMask: true,
		items: [
			isc.DynamicForm.create({
				ID: "updateForm",
				autoDraw: false,
				setData: function() {
					var me = this;
					var record = userList.getSelectedRecord();
					var user = Util.filterProperty(me.fields, record);
					me.setValues(user);
				},
				send: function() {
					var user = this.getValidatedValues();
					if (user) {
						Api.updateUser(user);
						return true;
					} else {
						return false;
					}
				},
				fields: Model.user,
			}),
			isc.IButton.create({
				ID: "updateSendButton",
				title: "send",
				click: function() {
					if (updateForm.send()) {
						updateWindow.hide();
						updateForm.reset();
						userList.refresh();
					}
				}
			})
		]
	})

	isc.Window.create({
		ID: "confirmDelete",
		title: "delete?",
		autoSize: true,
		isModal: true,
		autoCenter: true,
		showModalMask: true,
		autoDraw: false,
		items: [
			isc.HLayout.create({
				membersMargin: 10,
				members: [
					isc.IButton.create({
						title: "OK",
						click: function() {
							Grid.userList.delete();
							confirmDelete.hide();
						}
					}),
					isc.IButton.create({
						title: "Cancel",
						click: function() {
							confirmDelete.hide();
						}
					})
				]
			})
		]
	});


	return {
		formWindow: formWindow,
		updateForm: updateForm,
		updateWindow: updateWindow,
		confirmDelete: confirmDelete,
	};
});
