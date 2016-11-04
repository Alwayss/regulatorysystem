/**
 * Created by admin on 2016/11/3.
 */
angular.module('regulatorysystemFrontApp')
	.controller('contractListCtrl',function($scope,Contract,$localStorage,AccountAndProject){
		$scope.userId = $localStorage.userId;
		$scope.role = $localStorage.role;
		$scope.noData = false;
		if($scope.role == 'admin' || $scope.role == 'leader'){
			Contract.find({},function(data){
				if(data.length > 0){
					$scope.contracts = data;
					angular.forEach($scope.contracts,function(item){
						item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
						if(item['isChecked']){
							item.checked = '是';
						}else{
							item.checked = '否';
						}
					})
				}else{
					$scope.noData = true;
				}
			});
		}else{
			async.waterfall([
				function(cb){
					AccountAndProject.find({
						filter:{where:{accountId:$scope.userId}}
					},function(data){
						cb(null,data);
					})
				},function(data,cb){
					var ids = [];
					if(data.length > 0){
						$scope.noData = false;
						angular.forEach(data,function(item){
							ids.push(item.projectId);
						});
						Contract.findContractByProIds(ids,function(data){
							cb(null,data);
						})
					}else{
						$scope.noData = true;
						cb(null,{});
					}
				}
			],function(err,data){
				if(data.contracts && data.contracts.length > 0){
					$scope.contracts = data.contracts;
					angular.forEach($scope.contracts,function(item){
						item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
						if(item['isChecked']){
							item.checked = '是';
						}else{
							item.checked = '否';
						}
					})
				}
			});
		}
	});