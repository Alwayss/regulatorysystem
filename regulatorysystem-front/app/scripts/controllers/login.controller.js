/**
 * Created by admin on 2016/11/3.
 */
angular.module('regulatorysystemFrontApp')
	.controller('loginCtrl',function($scope,Account,$state,$localStorage,SweetAlert,Actor){
		$scope.login=function(){
			if($scope.user && $scope.user.username && $scope.user.password){
				Account.login($scope.user,function(data){
					$localStorage.userId = data.userId;
					$localStorage.username = data.user.username;
					if(!data.user['actorId']){
						$localStorage.role = 'admin';
						$state.go('app.project.list');
					}else{
						Actor.findById({
							id:data.user['actorId']
						},function(res){
							$localStorage.role = res.type;
							$state.go('app.project.list');
						})
					}
				},function(err){
					if(err.status == 401){
						SweetAlert.swal("", "用户名或密码错误", "warning");
					}
				})
			}else{
				SweetAlert.swal("", "请输入用户名和密码", "warning");
			}
		};
	});