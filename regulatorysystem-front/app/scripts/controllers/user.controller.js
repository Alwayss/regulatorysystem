/**
 * Created by admin on 2016/11/4.
 */
angular.module('regulatorysystemFrontApp')
	.controller('userCtrl',function($scope,$uibModal,Account,SweetAlert,$localStorage){
		$scope.role = $localStorage.role;
		$scope.noData = false;
		function init(){
			Account.find({filter:{include:'actor'}},function(data){
				if(data.length > 0){
					$scope.noData = false;
					$scope.userList = data;
					angular.forEach($scope.userList,function(user){
						if(user.actor){
							user.role = user.actor.name;
						}else{
							user.role = '超级管理员';
						}
					});
				}else{
					$scope.noData = true;
				}
			})
		}
		init();
		$scope.changeUser = function(tag,user){
			var modalInstance = $uibModal.open({
				templateUrl:'addUserContent.html',
				controller:'addUserContentCtrl',
				size:'',
				resolve:{
					items: function(){
						return user;
					}
				}
			});
			modalInstance.result.then(function(user){
				if(tag == 'add'){
					Account.create(user,function(data){
						init();
						SweetAlert.swal("", "添加成功", "success");
					},function(){
						SweetAlert.swal("", "网络错误", "warning");
					})
				}else{
					var userId = user.id;
					delete user.id;
					delete user.actor;
					Account.updateAll({where:{id:userId}},user,function(data){
						init();
						SweetAlert.swal("", "修改成功", "success");
					},function(){
						SweetAlert.swal("", "网络错误", "warning");
					})
				}
			});
		};
		$scope.delete=function(id){
			Account.deleteById({id:id},function(data){
				if(data.count == 1){
					init();
					SweetAlert.swal("", "删除成功", "success");
				}else{
					SweetAlert.swal("", "删除失败", "warning");
				}
			})
		};
	})
	.controller('addUserContentCtrl',function($scope,$uibModalInstance,items,Actor){
		$scope.role = {};
		console.log(items);
		if(items.username){
			$scope.user = items;
			$scope.role.selected = items.actor;
		}else{
			$scope.user = {};
		}
		Actor.find({},function(data){
			$scope.roleList = data;
		});
		$scope.ok = function(){
			$scope.user.actorId = $scope.role.selected.id;
			$uibModalInstance.close($scope.user);
		};
		$scope.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		};
	});