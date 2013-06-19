isc.ClassFactory.defineClass("RefreshPanel", isc.VLayout);

isc.RefreshPanel.addProperties({
	membersMargin: 10,
	initWidget: function() {
		var me = this;
		me.Super("initWidget", arguments);

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

		me.addMember(me.refreshButton);
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
    fields:[
		{ name: "userId", title: "ID" },
		{ name: "userName", title: "Name" },
		{ name: "userUserName", title: "UserName" }
	]
})

isc.RefreshPanel.create({
	ID: "groupPanel",
	width: 400, height: 500,
	dataFormat: "json",
	dataURL: "/rest/getGroups",
	fields: [
		{ name: "groupId", title: "ID" },
		{ name: "groupName", title: "Name" }
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
