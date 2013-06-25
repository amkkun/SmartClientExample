var user =  [
	{ name: "userId", title: "ID", type: "integer", align: "left" },
	{ name: "userName", title: "Name", type: "text" },
	{ name: "userUserName", title: "UserName", type: "text" }
];

var getUsers = function(callback) {
	RPCManager.sendRequest({
		httpMethod: "GET",
		actionURL: "/rest/getUsers",
		callback: callback,
		paramsOnly: true,
		evalResult: true
	})
};

var addUser = function(user) {
	RPCManager.sendRequest({
		httpMethod: "POST",
		actionURL: "/rest/addUser",
		params: user,
		paramsOnly: true,
		evalResult: true
	})
};

var addUserJSON = function(user) {
	var encoded = isc.JSON.encode(user);
	RPCManager.sendRequest({
		httpMethod: "POST",
		contentType: "application/json",
		httpHeaders: {
			"Accept": "application/json",
		},
		actionURL: "/rest/addUserJSON",
		data: encoded,
		paramsOnly: true,
	})
};

var updateUser = function(user) {
	var encoded = isc.JSON.encode(user);
	RPCManager.sendRequest({
		httpMethod: "POST",
		contentType: "application/json",
		httpHeaders: {
			"Accept": "application/json",
		},
		actionURL: "/rest/updateUser",
		data: encoded,
		paramsOnly: true,
	})
};

var deleteUser = function(userId) {
	RPCManager.sendRequest({
		httpMethod: "POST",
		actionURL: "/rest/deleteUser",
		params: { userId: userId },
		paramsOnly: true,
	})
};

var filterProperty = function(fields, data) {
	var filtered = {};
	fields.map(function(field) {
		filtered[field.name] = data[field.name];
	});
	return filtered;
};

isc.HLayout.create({
	ID: "buttons",
	membersMargin: 10,
	members: [
		isc.IButton.create({
			title: "refresh",
			click: function() {
				userList.refresh();
			}
		}),
		isc.IButton.create({
			title: "add user",
			click: function() {
				formWindow.show();
			}
		}),
		isc.IButton.create({
			ID: "updateButton",
			title: "update user",
			disabled: true,
			click: function() {
				updateForm.setData();
				updateWindow.show();
			}
		}),
		isc.IButton.create({
			ID: "deleteButton",
			title: "delete user",
			disabled: true,
			click: function() {
				confirmDelete.show();
			},
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

isc.Menu.create({
	ID: "contextMenu",
	width: 150,
	data: [{
		title: "add",
		click: function() {
			formWindow.show();
		}
	}, {
		title: "update",
		enableIf: function() {
			return userList.getSelectedRecord() != null;
		},
		click: function() {
			updateForm.setData();
			updateWindow.show();
		}
	}, {
		title: "delete",
		enableIf: function() {
			return userList.getSelectedRecord() != null;
		},
		click: function() {
			confirmDelete.show();
		}
	}]
})

isc.ListGrid.create({
	ID: "userList",
	width: 500, height: 400,
	fields: user,
	refresh: function() {
		var me = this;
		getUsers(function(rpcResponce, data, rpcRequest) {
			me.setData(data);
		});
	},
	initWidget: function() {
		this.Super("initWidget", arguments);
		this.refresh();
	},
	canEdit: true,
	editEvent: "doubleClick",
	editComplete: function(rowNum, colNum, newValues, oldValues, editCompletionEvent) {
		var me = this;
		var record = me.getEditedRecord(rowNum);
		var user = filterProperty(me.fields, record);
		updateUser(user);
		me.refresh();
	},
	selectionChanged: function(record, state) {
		deleteButton.setEnabled(state);
		updateButton.setEnabled(state);
	},
	delete: function() {
		var me = this;
		var record = me.getSelectedRecord();
		deleteUser(record.userId);
		me.refresh();
	},
	contextMenu: contextMenu
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

isc.VLayout.create({
	membersMargin: 10,
	members: [
		buttons,
		userList
	]
})
