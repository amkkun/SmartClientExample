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
					addUserJSON(user);
					return true;
				} else {
					return false;
				}
			},
			fields: user
		}),
		isc.IButton.create({
			ID: "sendButton",
			title: "send",
			click: function() {
				if (userForm.send()) {
					formWindow.hide();
					userForm.reset();
					userList.refresh();
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
				var user = filterProperty(me.fields, record);
				me.setValues(user);
			},
			send: function() {
				var user = this.getValidatedValues();
				if (user) {
					updateUser(user);
					return true;
				} else {
					return false;
				}
			},
			fields: user,
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
						userList.delete();
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
})
