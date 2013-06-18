isc.DataSource.create({
    ID: "userDS",
    dataFormat:"json",
    dataURL:"/rest/user.js",
    fields:[
		{ name: "id", title: "ID" },
		{ name: "name", title: "Name" },
		{ name: "username", title: "UserName" }
	]
});

isc.DataSource.create({
	ID: "groupDS",
	dataFormat: "json",
	dataURL: "/rest/group.js",
	fields: [
		{ name: "id", title: "ID" },
		{ name: "name", title: "Name" }
	]
})

isc.ClassFactory.defineClass("RefreshPanel", isc.VLayout);

isc.RefreshPanel.addProperties({
	membersMargin: 10,
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
	},
	initWidget: function() {
		var me = this;
		me.Super("initWidget", arguments);

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
	setDataSource: function(dataSource) {
		this.grid.setDataSource(dataSource);
	}
})

isc.RefreshPanel.create({
	ID: "userPanel",
	width: 400, height: 500,
	dataSource: userDS
})

isc.RefreshPanel.create({
	ID: "groupPanel",
	width: 400, height: 500,
	dataSource: groupDS
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
