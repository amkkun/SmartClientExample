'use strict';
define([
	"jquery"
], function($) {

	var getUsers = function(callback) {
		$.ajax({
			type: "GET",
			url: "/rest/getUsers",
			success: function(data) {
				callback(data);
			}
		});
	};

	var addUser = function(user) {
		$.ajax({
			type: "POST",
			url: "/rest/addUser",
			data: user,
		});
	};

	var addUserJSON = function(user) {
		$.ajax({
			type: "POST",
			url: "/rest/addUserJSON",
			data: JSON.stringify(user),
			dataType: "json",
			contentType: "application/json; charset=utf-8"
		});
	};

	var updateUser = function(user) {
		$.ajax({
			type: "POST",
			url: "/rest/updateUser",
			data: JSON.stringify(user),
			dataType: "json",
			contentType: "application/json; charset=utf-8"
		});
	};

	var deleteUser = function(userId) {
		$.ajax({
			type: "POST",
			url: "/rest/deleteUser",
			data: { userId: userId },
		});
	};

	return {
		getUsers: getUsers,
		addUser: addUser,
		addUserJSON: addUserJSON,
		updateUser: updateUser,
		deleteUser: deleteUser
	};
});
