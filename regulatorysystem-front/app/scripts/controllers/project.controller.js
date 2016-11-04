/**
 * Created by admin on 2016/11/2.
 */
angular.module('regulatorysystemFrontApp')
	.controller('projectListCtrl',function($scope,Project,$localStorage,AccountAndProject){
		$scope.noData = false;
		$scope.role = $localStorage.role;
		$scope.userId = $localStorage.userId;
		$scope.projects = [];
		if($scope.role =='admin' || $scope.role =='leader'){
			Project.find({},function(data){
				if(data.length > 0){
					$scope.noData = false;
					$scope.projects = data;
					angular.forEach($scope.projects,function(item){
						item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
					})
				}else{
					$scope.noData = true;
				}
			});
		}else{
			AccountAndProject.find({
				filter:{include:'project',where:{accountId:$scope.userId}}
			},function(data){
				if(data.length > 0){
					$scope.noData = false;
					angular.forEach(data,function(item){
						$scope.projects.push(item.project);
					});
					angular.forEach($scope.projects,function(item){
						item.created = moment(item.created).format('YYYY-MM-DD HH:mm:ss');
					})
				}else{
					$scope.noData = true;
				}
			});
		}
	});