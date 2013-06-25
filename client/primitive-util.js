var filterProperty = function(fields, data) {
	var filtered = {};
	fields.map(function(field) {
		filtered[field.name] = data[field.name];
	});
	return filtered;
};
