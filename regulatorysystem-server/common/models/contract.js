module.exports = function(Contract) {
	Contract.definition.rawProperties.isChecked.default =
		Contract.definition.properties.isChecked.default = function() {
			return false;
		};
	Contract.findContractByProIds=function(arr,cb){
		Contract.find({
			where:{projectId:{inq:arr}}
		},function(err,contracts){
			if(err) console.log(err);
			cb(null,contracts);
		})
	}
};
