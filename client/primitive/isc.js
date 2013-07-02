define([
	'core',
	'foundation',
	'containers',
	'grids',
	'forms',
	'dataBinding',
	'skin'
], function() {

	isc.IButton.create({
		title: "testestsetst",
		click: function() {
			alert("!!!!");
		}
	});
	return isc;
});
