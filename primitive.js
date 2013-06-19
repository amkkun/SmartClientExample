var user =  [
	{ name: "userId", title: "ID", type: "text" },
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

isc.ListGrid.create({
	ID: "userList",
	width: 500, height: 400,
	refresh: function() {
		var me = this;
		getUsers(function(rpcResponce, data, rpcRequest) {
			me.setData(data);
		});
	},
	fields: user
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
				var user = this.getValues();
				console.log(user);
				addUser(user);
			},
			fields: user
		}),
		isc.IButton.create({
			ID: "sendButton",
			title: "send",
			click: function() {
				userForm.send();
				formWindow.hide();
				userForm.reset();
				userList.refresh();
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
