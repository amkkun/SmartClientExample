define([
	"primitive-grid",
	"primitive-window"
], function(Grid, Window) {

	var buttons = isc.HLayout.create({
		membersMargin: 10,
		members: [
			isc.IButton.create({
				title: "refresh",
				click: function() {
					Grid.userList.refresh();
				}
			}),
			isc.IButton.create({
				title: "add user",
				click: function() {
					Window.formWindow.show();
				}
			}),
			isc.IButton.create({
				ID: "updateButton",
				title: "update user",
				disabled: true,
				click: function() {
					Window.updateForm.setData();
					Window.updateWindow.show();
				}
			}),
			isc.IButton.create({
				ID: "deleteButton",
				title: "delete user",
				disabled: true,
				click: function() {
					Window.confirmDelete.show();
				},
			})
		]
	});

	return {
		buttons: buttons
	};
});
