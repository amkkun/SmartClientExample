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
