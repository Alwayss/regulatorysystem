module.exports = function(Stake) {
	Stake.definition.rawProperties.created.default =
		Stake.definition.properties.created.default = function() {
			return new Date();
		};
};
