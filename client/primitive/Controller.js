'use strict';
define([
	"Grid"
], function() {

	refreshGrid: function() {
		Api.getUsers(function(rpcResponce, data, rpcRequest) {
			Grid.userGrid.setData(data);
		});
	},
	// TODO
	deleteRecord: function() {
		var record = userGrid.getSelectedRecord();
		Api.deleteUser(record.userId);
		refreshGrid();
	}

	return {
		refreshGrid: refreshGrid,
		deleteRecord: deleteRecord
	}
});
