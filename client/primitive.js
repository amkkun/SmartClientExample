var user =  [
	{ name: "userId", title: "ID", type: "integer" },
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
	}
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
