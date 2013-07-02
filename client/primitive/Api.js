'use strict';
define([
], function() {

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

	var updateUser = function(user) {
		var encoded = isc.JSON.encode(user);
		RPCManager.sendRequest({
			httpMethod: "POST",
			contentType: "application/json",
			httpHeaders: {
				"Accept": "application/json",
			},
			actionURL: "/rest/updateUser",
			data: encoded,
			paramsOnly: true,
		})
	};

	var deleteUser = function(userId) {
		RPCManager.sendRequest({
			httpMethod: "POST",
			actionURL: "/rest/deleteUser",
			params: { userId: userId },
			paramsOnly: true,
		})
	};

	return {
		getUsers: getUsers,
		addUser: addUser,
		addUserJSON: addUserJSON,
		updateUser: updateUser,
		deleteUser: deleteUser
	};
});
