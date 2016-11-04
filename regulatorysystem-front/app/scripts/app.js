'use strict';

/**
 * @ngdoc overview
 * @name regulatorysystemFrontApp
 * @description
 * # regulatorysystemFrontApp
 *
 * Main module of the application.
 */
angular
	.module('regulatorysystemFrontApp',[
		'ngAnimate',
		'ngResource',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'lbServices',
		'ui.select',
		'ngFileUpload',
		'uuid4',
		'oitozero.ngSweetAlert',
		'monospaced.qrcode',
		'ngStorage'
	])
	.constant('APP_MEDIAQUERY', {
		'desktopXL': 1200,
		'desktop': 992,
		'tablet': 768,
		'mobile': 480
	})
	.constant('baseUrl','http://192.168.0.105:3000')
	.constant('runBaseUrl','http://192.168.0.105:9000')
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/account/login');
	})
	.run(function($rootScope,$state,$stateParams){
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		// 设置全局变量app
		$rootScope.app  = {
			name:'地基一所工作管理与现场监管系统', // name of your project
			author:'广东省建筑科学研究院集团股份有限公司', // author's name or company name
			description:'Angular Bootstrap Admin Template', // brief description
			version:'1.0', // current version
			year:((new Date()).getFullYear()), // automatic current year (for copyright information)
			isMobile:(function(){// true if the browser is a mobile device
				var check = false;
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
					check = true;
				};
				return check;
			})(),
			layout:{
				isNavbarFixed:true, //true if you want to initialize the template with fixed header
				isSidebarFixed:true, // true if you want to initialize the template with fixed sidebar
				isSidebarClosed:false, // true if you want to initialize the template with closed sidebar
				isFooterFixed:true, // true if you want to initialize the template with fixed footer
				theme:'theme-3', // indicate the theme chosen for your project
				logo:'./images/logo.png', // relative path of the project logo
			}
		};
		$rootScope.districts =[{
			name:'珠三角',
			children:[{
				name:'广州市'
			},{
				name:'深圳市'
			},{
				name:'佛山市'
			},{
				name:'东莞市'
			},{
				name:'中山市'
			},{
				name:'珠海市'
			},{
				name:'江门市'
			},{
				name:'肇庆市'
			},{
				name:'惠州市'
			}]
		},{
			name:'粤东',
			children:[{
				name:'汕头市'
			},{
				name:'潮州市'
			},{
				name:'揭阳市'
			},{
				name:'汕尾市'
			}]
		},{
			name:'粤西',
			children:[{
				name:'湛江市'
			},{
				name:'茂名市'
			},{
				name:'阳江市'
			}]
		},{
			name:'粤北',
			children:[{
				name:'韶关市'
			},{
				name:'清远市'
			},{
				name:'云浮市'
			},{
				name:'梅州市'
			},{
				name:'河源市'
			}]
		}];
	});
