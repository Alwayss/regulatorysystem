module.exports = function(Account) {
	Account.definition.rawProperties.created.default =
		Account.definition.properties.created.default = function() {
			return new Date();
		};
};
