isc.ClassFactory.defineClass("AddForm", isc.Window);
isc.AddForm.addProperties({
	width: 400, height: 300,
	autoDraw: false,
	autoCenter: true,
	isModal: true,
	showModalMask: true,
	initWidget: function() {
		var me = this;
		me.Super("initWidget", arguments);

		me.post = isc.DataSource.create({
			dataURL: "/rest/add" + me.modelName,
			dataFormat: "json",
			dataProtocol: "postParams",
			transformResponce: function(_, _, _) {
			}
		});

		me.form = isc.DynamicForm.create({
			autoDraw: false,
			dataSource: me.post,
			fields: me.fields
		});

		me.button = isc.Button.create({
			title: "send",
			click: function() {
				me.form.saveData();
				me.hide();
				me.refresh();
			}
		});

		me.items = [
			me.form,
			me.button
		];
	}
})

isc.ClassFactory.defineClass("RefreshPanel", isc.VLayout);
isc.RefreshPanel.addProperties({
	membersMargin: 10,
	initWidget: function() {
		var me = this;
		me.Super("initWidget", arguments);

		me.buttonLayout = isc.HLayout.create({
			membersMargin: 10,
			members: [
				isc.IButton.create({
					title: "refresh",
					click: function() {
						me.refresh();
					}
				}),
				isc.IButton.create({
					title: "add " + me.modelName,
					click: function() {
						me.form.show();
					}
				})
			]
		})

		me.dataSource = isc.DataSource.create({
			dataFormat: me.dataFormat,
			dataURL: me.dataURL,
			fields: me.fields
		})

		me.refreshButton = isc.IButton.create({
			title: "refresh",
			click: function() {
				me.refresh();
			}
		})

		me.createGrid();

		me.form = isc.AddForm.create({
			title: "Add " + me.modelName,
			modelName: me.modelName,
			fields: me.fields
		})

		me.addMember(me.buttonLayout);
		me.addMember(me.grid);
	},
	createGrid: function() {
		var me = this;
		me.grid = isc.ListGrid.create({
			width: me.width, height: me.height,
			dataSource: me.dataSource,
			autoFetchData: true,
		})
	},
	refresh: function() {
		var me = this;
		me.grid.destroy();
		me.createGrid();
		me.addMember(me.grid);
	}
})

isc.RefreshPanel.create({
	ID: "userPanel",
	width: 400, height: 500,
    dataFormat:"json",
    dataURL:"/rest/getUsers",
	modelName: "User",
    fields: [
		{ name: "userId", title: "ID", type: "text" },
		{ name: "userName", title: "Name", type: "text" },
		{ name: "userUserName", title: "UserName", type: "text" }
	]
})

isc.RefreshPanel.create({
	ID: "groupPanel",
	width: 400, height: 500,
	dataFormat: "json",
	dataURL: "/rest/getGroups",
	modelName: "Group",
	fields: [
		{ name: "groupId", title: "ID", type: "text" },
		{ name: "groupName", title: "Name", type: "text" }
	]
})

isc.HLayout.create({
	ID: "layout",
	width: 800,
	height: 500,
	membersMargin: 10,
	members: [
		userPanel,
		groupPanel
	]
})
