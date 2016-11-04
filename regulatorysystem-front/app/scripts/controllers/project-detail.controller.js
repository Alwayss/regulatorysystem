/**
 * Created by admin on 2016/11/3.
 */
angular.module('regulatorysystemFrontApp')
	.controller('projectDetailCtrl',function($rootScope,$scope,$stateParams,Project,Detection,Contract,$localStorage,SweetAlert){
		$scope.role = $localStorage.role;
		$scope.checked = false;
		$scope.test = {};
		$scope.projectId = $stateParams.id;
		$scope.userId = $localStorage.userId;
		var index = 0;
		Detection.find({},function(data){
			if(data.length > 0){
				$scope.selectList = data;
			}
		});

		$scope.$watch('test.selected',function(){
			if($scope.test.selected){
				$scope.testers[index].name = $scope.test.selected.name;
				$scope.testers[index].code = $scope.test.selected.code;
			}
		});
		//点击添加方法
		$scope.addTestFn = function(){
			$scope.testers.push({name:'',code:'',num:'',numPrice:'',ton:'',tonPrice:'',type:'0'});
			index = $scope.testers.length - 1;
		};
		async.parallel({
			project:function(cb){
				Project.findById({
					id:$scope.projectId,
					filter:{where:{include:'contract'}}
				},function(data){
					cb(null,data);
				});
			},
			contract:function(cb){
				Project.contract({
					id:$scope.projectId
				},function(data){
					cb(null,data);
				})
			}
		},function(err,result){
			$scope.project = result.project;
			var strArr = $scope.project.site.split('-');
			angular.forEach($rootScope.districts,function(item){
				if(item.name == strArr[0]){
					$scope.area = item;
					$scope.cities = $scope.area.children;
				}
			});
			angular.forEach($scope.area.children,function(item){
				if(item.name == strArr[1]){
					$scope.city = item;
				}
			});
			if(($scope.role && $scope.role == 'builder') || ($scope.userId != $scope.project.principalId && $scope.role == 'projectLeader')){
				$scope.checked = true;
			}
			$scope.contract = result.contract;
			if($scope.contract['factWork']){
				$scope.testers = $scope.contract['factWork'];
			}else{
				$scope.testers=[{name:'',code:'',num:'',umPrice:'',ton:'',tonPrice:'',type:'0'}];
			}
			$scope.downloadUrl = $scope.contract.fileList[0]['url'];
			$scope.today();
		});

		$scope.submit=function(){
			var temp = [];
			angular.forEach($scope.testers,function(item){
				if(item.type != '0'){
					temp.push(item);
				}
			});
			if(temp.length > 0){
				$scope.contract['factWork'] = temp;
			}
			var projectId = $scope.project.id;
			var contractId = $scope.contract.id;
			async.parallel({
				project:function(cb){
					delete $scope.project.id;
					Project.updateAll({where:{id:projectId}},$scope.project,function(info){
						cb(null,info.count);
					});
				},
				contract:function(cb){
					delete $scope.contract.id;
					Contract.updateAll({where:{id:contractId}},$scope.contract,function(info){
						cb(null,info.count);
					});
				}
			},function(err,result){
				if(result.project.count == 1 && result.contract.count == 1){
					SweetAlert.swal("", "修改成功！", "success");
				}
			});
			console.log($scope.contract);
		};
		//有关时间选择的配置
		$scope.today = function() {
			$scope.dt = new Date($scope.contract.receivableDate);
		};
		$scope.clear = function() {
			$scope.dt = null;
		};
		$scope.dateOptions = {
			dateDisabled: disabled,
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};
		// Disable weekend selection
		function disabled(data) {
			var mode = data.mode;
			return mode === 'day' && false;
		}
		$scope.toggleMin = function() {
			$scope.dateOptions.minDate = new Date();
		};
		$scope.toggleMin();
		$scope.open = function() {
			$scope.popup.opened = true;
		};
		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};
		$scope.format = 'dd-MMMM-yyyy';
		$scope.popup = {
			opened: false
		};
	});