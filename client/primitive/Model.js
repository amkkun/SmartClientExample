'use strict';
define([], function() {

	var user =  [
		{ name: "userId", title: "ID", type: "integer", align: "left" },
		{ name: "userName", title: "Name", type: "text" },
		{ name: "userUserName", title: "UserName", type: "text" }
	];

	return {
		user: user
	};
});
