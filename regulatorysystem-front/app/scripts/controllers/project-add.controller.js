/**
 * Created by admin on 2016/11/3.
 */
angular.module('regulatorysystemFrontApp')
	.controller('projectAddCtrl',function($scope,Project,Contract,SweetAlert,Account,AccountAndProject,$localStorage){
		$scope.role = $localStorage.role;
		$scope.getDistrict=function(){
			$scope.cities = $scope.area.children;
		};
		if($scope.role != 'admin'){
			$scope.project = {
				principal:$localStorage.username,
				principalId:$localStorage.userId
			};
		}
		Account.find({filter:{include:'actor'}},function(data){
			$scope.selected = {};
			$scope.selected.users=[];
			var temp=[];
			angular.forEach(data,function(user){
				if($scope.role != 'admin'){
					if(user['actorId'] && user['id'] == $scope.project.principalId){
						$scope.selected.users.push(user);
					}
				}
				if(user['actorId'] && user['actor']['type'] != 'leader'){
					temp.push(user);
				}
			});
			$scope.users= temp;
		});
		$scope.submit=function(){
			if($scope.contractId != '' && $scope.contractId != undefined){
				async.waterfall([
					function(cb){
						Contract.find({
							filter:{where:{guid:$scope.contractId}}
						},function(data){
							if(data.length > 0){
								cb(null,data[0].id);
							}else{
								cb(null,0);             //0代表系统中不存在此合同
							}
						})
					},function(arg,cb){
						if(arg == 0){
							cb(null,0,null);
						}else{
							Project.find({
								filter:{where:{contractId:arg}}
							},function(data){
								if(data.length > 0){
									cb(null,2,null);          //2代表此合同已经与某项目关联了
								}else{
									cb(null,1,arg);          //1代表此合同可用
								}
							})
						}
					},function(arg,id,cb){
						if(arg == 1){
							$scope.project.site = $scope.area.name + '-' + $scope.city.name;
							$scope.project.contractId = id;
							Project.create($scope.project,function(data){        //创建项目
								Contract.updateAll({                               //关联项目与合同
									where:{id:id}
								},{projectId:data.id},function(response){
									console.log(response);
								});
								var aap = [];
								angular.forEach($scope.selected.users,function(user){
									aap.push({accountId:user.id,projectId:data.id});
								});
								AccountAndProject.createRelations(aap,function(response){
									console.log(response);
								});
								cb(null,1);
							});
						}else{
							cb(null,arg);
						}
					}
				],function(err,result){
					if(result == 0){
						SweetAlert.swal("", "系统中不存在该编号的合同！", "warning");
					}else if(result == 2){
						SweetAlert.swal("", "该合同已存在关联关系！", "warning");
					}else{
						SweetAlert.swal("", "添加成功！", "success");
					}
				});
			}
		}
	}).filter('propsFilter', function() {
		return function(items, props) {
			var out = [];
			if (angular.isArray(items)) {
				var keys = Object.keys(props);
				items.forEach(function(item) {
					var itemMatches = false;
					for (var i = 0; i < keys.length; i++) {
						var prop = keys[i];
						var text = props[prop].toLowerCase();
						if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
							itemMatches = true;
							break;
						}
					}
					if (itemMatches) {
						out.push(item);
					}
				});
			} else {
				out = items;
			}
			return out;
		};
	});
