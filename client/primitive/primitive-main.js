define([
	"primitive-buttons",
	"primitive-grid"
], function(Buttons, Grid) {
	isc.VLayout.create({
		membersMargin: 10,
		members: [
			Buttons.buttons,
			Grid.userList
		]
	})
});
