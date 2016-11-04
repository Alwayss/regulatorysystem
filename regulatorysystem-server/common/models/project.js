module.exports = function(Project) {
	Project.definition.rawProperties.created.default =
		Project.definition.properties.created.default = function() {
			return new Date();
		};
	Project.definition.rawProperties.status.default =
		Project.definition.properties.status.default = function() {
			return 'Î´½á';
		};
};
