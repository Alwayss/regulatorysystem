///**
// * Created by admin on 2016/11/1.
// */
//var async = require('async');
//
//module.exports = function(app){
//	var mongoDs = app.dataSources.mongoDs;
//	var RoleMapping = app.models.RoleMapping;
//
//	async.parallel({
//		role:async.apply(createAdminRole),
//		accounts:async.apply(createAdminUser),
//		detections:async.apply(createDetections)
//	},function(err,results){
//		if(err) throw err;
//		results.role.principals.create({          //默认admin为管理员用户
//			principalType:RoleMapping.USER,
//			principalId:results.accounts[0].id
//		},function(err){
//			if(err) throw err;
//		});
//	});
//
//	function createAdminRole(cb){
//		mongoDs.automigrate('Role',function(err){
//			if(err) return cb(err);
//			var Role = app.models.Role;
//			Role.create({name:'administrator',description:'系统管理员'},cb);
//		});
//	}
//
//	function createAdminUser(cb){
//		mongoDs.automigrate('account',function(err){
//			if(err) return cb(err);
//			var Account = app.models.account;
//			Account.create([{username:'admin',password:'admin',email:'admin@infoearth.com'},
//				{username:'guest',password:'guest',email:'guest@infoearth.com',actorId:'581bed17defc69e03f152598'}],cb);
//		});
//	}
//	//actors:async.apply(createActors),
//	//function createActors(cb){
//	//	//mongoDs.automigrate('actor',function(err){
//	//	//	if(err) return cb(err);
//	//	//	var actor = app.models.actor;
//	//	//	actor.create([
//	//	//		{name:'领导',type:'leader'},
//	//	//		{name:'项目负责人',type:'projectLeader'},
//	//	//		{name:'内勤经济员',type:'clerk'},
//	//	//		{name:'施工检测员',type:'builder'}],cb);
//	//	//});
//	//}
//
//	//初始化检测方法
//	function createDetections(cb){
//		mongoDs.automigrate('detection',function(err){
//			if(err) return cb(err);
//			var Detection = app.models.detection;
//			Detection.create([
//				{code:'201001',name:'单(群)桩竖向抗压静载试验',testLoad:200,unitPrice:200},
//				{code:'201002',name:'单(群)桩竖向抗拔静载试验',testLoad:200,unitPrice:200},
//				{code:'201003',name:'单桩水平静载试验',testLoad:200,unitPrice:200},
//				{code:'201004',name:'地基、复合地基(浅层)平板载荷试验',testLoad:200,unitPrice:200},
//				{code:'201005',name:'深层平板载荷试验',testLoad:200,unitPrice:200},
//				{code:'201006',name:'复合地基单桩载荷试验',testLoad:200,unitPrice:200},
//				{code:'201007',name:'岩基载荷、工程岩体试验',testLoad:200,unitPrice:200},
//				{code:'201008',name:'支护锚杆抗拔试验',testLoad:200,unitPrice:200},
//				{code:'201009',name:'土钉抗拔试验',testLoad:200,unitPrice:200},
//				{code:'201010',name:'基础锚杆抗拔试验',testLoad:200,unitPrice:200},
//				{code:'201011',name:'原位测试',testLoad:200,unitPrice:200},
//				{code:'201999',name:'地基一所其他',testLoad:200,unitPrice:200}
//			],cb);
//		});
//	}
//};