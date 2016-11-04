/**
 * Created by admin on 2016/11/2.
 */
angular.module('regulatorysystemFrontApp')
	.controller('contractAddCtrl',function($scope,Detection,Upload,baseUrl,uuid4,Contract,SweetAlert){
		$scope.test = {};
		$scope.contract = {};
		$scope.contract.contractAmount = 0;
		$scope.fileNames = '';
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
		//合同金额输入框在取得焦点时自动计算金额
		$scope.getAmount=function(){
			if($scope.testers.length > 0){
				for(var i =0;i<$scope.testers.length;i++){
					$scope.contract.contractAmount += getTestAmount($scope.testers[i]);
				}
			}
		};
		$scope.$watch('files',function(){
			if($scope.files && $scope.files.length > 0){
				angular.forEach($scope.files,function(file){
					$scope.fileNames += file.name +',';
				});
			}
		});
		//上传文件
		$scope.uploadFiles = function (files) {
			$scope.contract.fileList = [];
			if (files && files.length) {
				angular.forEach(files, function (file) {
					var uuid = uuid4.generate();
					$scope.contract.fileList.push({
						name: file.name,
						url: baseUrl + '/api/containers/contract/download/' + uuid + '.' + file.name.split('.')[1]
					});
					Upload.rename(file, uuid + '.' + file.name.split('.')[1]);
					Upload.upload({
						url: baseUrl + '/api/containers/contract/upload',
						data: {file: file}
					});
				});
			}
		};

		$scope.submit=function(){
			$scope.uploadFiles($scope.files);        //提交附件
			$scope.contract.planWork = $scope.testers;
			$scope.contract.receivableDate = $scope.dt;
			console.log($scope.contract);
			Contract.create($scope.contract,function(data){
				if(data){
					SweetAlert.swal("", "添加成功", "success");
				}
			},function(){
				SweetAlert.swal("", "网络错误", "warning");
			});
		};
		$scope.cancel=function(){
			$scope.test = {};
			$scope.contract = {};
			$scope.contract.contractAmount = 0;
			$scope.fileNames = '';
			$scope.testers=[{name:'',code:'',num:'',umPrice:'',ton:'',tonPrice:'',type:'0'}];
		};

		function getTestAmount(obj){
			var sum = 0;
			if(obj.type == '1'){         //根据点或根数来计算金额
				sum = parseInt(obj.num) * parseInt(obj.numPrice);
			}else{
				sum = parseInt(obj.ton) * parseInt(obj.tonPrice);
			}
			return sum;
		}

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