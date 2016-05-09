var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var detail = '';
var configData;


readFile("./config.json",function(data) {
    configData = JSON.parse(data.toString());
    var playList = configData.playList;
    fetchDetail(playList,function (detail) {
        var playListDetail = JSON.parse(detail);
        var musicArr = playListDetail.result.tracks;
        var musicNum = musicArr.length;
        app.get("/app", function(req,res) {
            console.log("get /");
            var index = Math.floor(Math.random()*musicArr.length);
            console.log(musicArr.length+" "+index);
            musicData = {
                artist: musicArr[index].artists[0].name,
                pic: musicArr[index].album.picUrl,
                name: musicArr[index].name,
                mp3Url: musicArr[index].mp3Url
            }
            res.send(musicData);
        });
        
        //musicArr[0].mp3Url;
    })
});

/**
* fetch playList detail
*/
function fetchDetail (id,callback) {
	var r = http.request("http://music.163.com/api/playlist/detail?id="+id, function(res) {
	    res.on("data", function(chunk) {
	        detail += chunk.toString('utf8').trim();
            setTimeout(function() {
                callback(detail);
            },3000)
	    });
	}).on("error", function (e) {
	    console.log(e.message);
	});
	r.end();
}

/**
* method that read File content
*/
function readFile(file, callback) {
	fs.readFile(file, function (err,data) {
		if (err) {
			console.log("Unknown error,readfile failed" +err);
		} else {
			callback(data);
		}
	})
}
    

//router
/*app.get("/app", function(req,res) {
    console.log("get /");
})*/

app.listen('80', function() {
    console.log("app running on server port 80");
})

