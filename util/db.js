//sqlz mysql
var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('acsm_3863f055e350ee9', 'bdac84d335f56e', '613f8f9a', {
	host: 'ap-cdbr-azure-east-c.cloudapp.net',
	dialect: 'mysql',
	port: 3306,
	define: {
		timestamps: false
	},
	pool: {
		maxIdleTime: 15*60000
	}
});
var sqlzModels = require('../models/sqlz')(sequelize);

//mongodb
require('../models/mongo');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://davidhu34:123qweasd@ds058508.mongolab.com:58508/news');
mongoose.connect('mongodb://davidhu34:123qweasd@ds060478.mongolab.com:60478/news1');
var mongoPost = mongoose.model('Post');

exports = module.exports = {};

exports.checkPath = function (md5) {
	sqlzModels.Post.findOne({
		where: {
			id: md5
		}
	}).then( function (data) {
		//console.log(data.dataValues);
		return (data)? true: false;
	}, function (err) {
		console.log('sqlz query err: ' + err);
		return true;
	});
	//return false if data from "path" is not yet collected
};
exports.newPost = function ( md5, time, title, url, source, keywords, content, images) {
//parameter types( String, Date, String, String, String, [String], String, [ {url: String, description: String} ] )
	console.log(images);
	sqlzModels.Post.create({
		id: md5,
		time: time,
		title: title,
		url: url,
		source: source,
		tag: tag
	}).then( function (data) {
		console.log('created');
		//console.log(data.dataValues);
		var PostMongo = new mongoPost();
		PostMongo.id = md5;
		PostMongo.keywords = keywords;
		PostMongo.content = content;
		PostMongo.images = images;
		PostMongo.save( function(err) {
			if (err) {
				console.log( 'Error in Saving PostMongo: ' + err);  
				throw err;  
			}
			console.log('succesful');    
		});
	}, function (err) {
		console.log('creation err: ' + err);
	});
};
