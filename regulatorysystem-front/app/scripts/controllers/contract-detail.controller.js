/**
 * Created by admin on 2016/11/3.
 */
angular.module('regulatorysystemFrontApp')
	.controller('contractDetailCtrl',function($scope,$stateParams,Detection,Contract,runBaseUrl,$localStorage,SweetAlert){
		$scope.role = $localStorage.role;
		if($scope.role == 'builder'){
			$scope.checked = true;
		}
		$scope.test = {};
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

		$scope.contractId = $stateParams.id;
		Contract.findById({
			id:$scope.contractId
		},function(data){
			$scope.contract = data;
			if($scope.contract['factWork']){
				$scope.testers = $scope.contract['factWork'];
			}else{
				$scope.testers=[{name:'',code:'',num:'',umPrice:'',ton:'',tonPrice:'',type:'0'}];
			}
			$scope.contractCode = runBaseUrl +'/#/app/contract/detail/' + $scope.contract.id;
			$scope.downloadUrl = $scope.contract.fileList[0]['url'];
			$scope.today();
		});
		$scope.test = {};    //获取检测方法
		var index = 0;
		Detection.find({},function(data){
			if(data.length > 0){
				$scope.selectList = data;
			}
		});
		$scope.testers=[{name:'',code:'',num:'',umPrice:'',ton:'',tonPrice:'',type:'0'}];
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

		//function getTestAmount(obj){
		//	var sum = 0;
		//	if(obj.type == '1'){         //根据点或根数来计算金额
		//		sum = parseInt(obj.num) * parseInt(obj.numPrice);
		//	}else{
		//		sum = parseInt(obj.ton) * parseInt(obj.tonPrice);
		//	}
		//	return sum;
		//}

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
			var contractId = $scope.contract.id;
			delete $scope.contract.id;
			Contract.updateAll({where:{id:contractId}},$scope.contract,function(info){
				if(info.count == 1){
					SweetAlert.swal("", "修改成功！", "success");
				}else{
					SweetAlert.swal("", "修改失败！", "warning");
				}
			});
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