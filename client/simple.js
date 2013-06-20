var user =  [
	{ name: "userId", title: "ID", type: "text" },
	{ name: "userName", title: "Name", type: "text" },
	{ name: "userUserName", title: "UserName", type: "text" }
];

isc.DataSource.create({
	ID: "userDS",
	dataFormat: "json",
	operationBindings: [
		{ operationType: "fetch", dataURL: "/rest/getUsers" },
		{ operationType: "add", dataProtocol: "postParams", dataURL: "/rest/addUser" }
	],
	fields: user
})

isc.DataSource.create({
	ID: "getUserDS",
	dataFormat: "json",
	dataURL: "/rest/getUsers",
    fields: user
})

isc.DataSource.create({
	ID: "addUserDS",
	dataFormat: "json",
	dataProtocol: "postParams",
	dataURL: "/rest/addUser"
})

isc.ListGrid.create({
	ID: "userList",
	width: 500, height: 400,
	dataSource: userDS // getUserDS
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
			method: "POST",
			dataSource: userDS, // addUserDS,
			fields: user
		}),
		isc.IButton.create({
			ID: "sendButton",
			title: "send",
			click: function() {
				userForm.saveData();
				formWindow.hide();
				userList.setData();
				userList.fetchData();
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
				userList.setData();
				userList.fetchData();
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
