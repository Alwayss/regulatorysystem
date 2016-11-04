/**
 * Created by admin on 2016/11/4.
 */
angular.module('regulatorysystemFrontApp')
	.controller('powerCtrl',function($scope,$localStorage,$state){
		$scope.role = $localStorage.role;
		$scope.username = $localStorage.username;
		console.log($scope.role);
		$scope.logout=function(){
			delete $localStorage.userId;
			delete $localStorage.role;
			$state.go('account.login');
		}
	});