module.exports = function(AccountAndProject) {
	AccountAndProject.createRelations = function(arr,cb){
		AccountAndProject.create(arr,function(err,data){
			if(err) console.log(err);
			cb(null,'success');
		})
	}
};
