/**
 * Created by admin on 2016/11/1.
 */
angular.module('regulatorysystemFrontApp')
	.config(function($stateProvider){
		$stateProvider
			.state('app',{
				url: "/app",
				templateUrl: "views/app.html",
				abstract:true
			})
			.state('app.dashboard',{
				url: "/dashboard",
				templateUrl: "views/dashboard.html",
			})
			.state('app.user',{
				url: "/user",
				templateUrl: "views/user.html",
				controller:'userCtrl'
			})
			.state('app.project',{
				url: "/project",
				template: '<div ui-view class="fade-in-up"></div>',
			})
			.state('app.project.list',{
				url: "/list",
				templateUrl: 'views/project-list.html',
				controller:'projectListCtrl'
			})
			.state('app.project.add',{
				url: "/add",
				templateUrl: 'views/project-add.html',
				controller:'projectAddCtrl'
			})
			.state('app.project.detail',{
				url: "/detail/:id",
				templateUrl: 'views/project-detail.html',
				controller:'projectDetailCtrl'
			})
			.state('app.contract',{
				url: "/contract",
				template: '<div ui-view class="fade-in-up"></div>',
			})
			.state('app.contract.list',{
				url: "/list",
				templateUrl: 'views/contract-list.html',
				controller:'contractListCtrl'
			})
			.state('app.contract.add',{
				url: "/add",
				templateUrl: 'views/contract-add.html',
				controller:'contractAddCtrl'
			})
			.state('app.contract.detail',{
				url: "/detail/:id",
				templateUrl: 'views/contract-detail.html',
				controller:'contractDetailCtrl'
			})
			.state('account',{
				url: "/account",
				template: '<div ui-view class="fade-in-right-big smooth"></div>',
				abstract:true
			})
			.state('account.login',{
				url: "/login",
				templateUrl: 'views/login.html',
				controller:'loginCtrl'
			});
	});