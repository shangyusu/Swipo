var db = require('./util/db');
var appleCrawler = require('./newsCrawler/AppleData');
var CNACrawler = require('./newsCrawler/CNAData');
console.log('haha');
//db.checkPath(path)
//return false if data from "path"(String) is not yet collected

//db.newPost(time, title, path, source, tags, content, images)
//param types(Date, String, String, String, String, [String], String, [String] )

/*	

<(_ _)><(_ _)><(_ _)>start your code<(_ _)><(_ _)><(_ _)>

if ( db.checkPath(path) ) {

	~~start collecting~~

	db.newPost(...);

} else {
	~~next path~~~~
}
*/

var apple = true;
var cna = true;

// Apple Daily Crawler
if(apple){
	appleCrawler.getAllNewsLinks().then(
		function(paths){
			appleCrawler.getAllNewsObjectByPathsArray(paths, db.checkPath, db.newPost);
		},
		function(reason){
			console.error(reason);
		}
);

	setInterval(function(){
		appleCrawler.getAllNewsLinks().then(
			function(paths){
				appleCrawler.getAllNewsObjectByPathsArray(paths, db.checkPath, db.newPost);
			},
			function(reason){
				console.error(reason);
			}
		);
	},5*60*1000);
}

// CNA Crawler
if(cna){
	CNACrawler.getAllNewsLinks().then(
		function(paths){
			CNACrawler.getAllNewsObjectByPathsArray(paths, db.checkPath, db.newPost);
		},
		function(reason){
			console.error(reason);
		}
	);

	setInterval(function(){
		CNACrawler.getAllNewsLinks().then(
			function(paths){
				CNACrawler.getAllNewsObjectByPathsArray(paths, db.checkPath, db.newPost);
			},
			function(reason){
				console.error(reason);
			}
		);
	},5*60*1000);
}
