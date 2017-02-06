var express = require("express");
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require("path");
var fs = require("fs");
var helmet = require("helmet");
const os = require('os');

var Server = function(config, callback) {
	console.log("Starting server op port " + config.port + " ... ");

	server.listen(config.port, config.address ? config.address : null);

	app.use(helmet());

	//app.use("/js", express.static(__dirname));
	app.use("/config", express.static(path.resolve(global.root_path + "/config")));
	app.use("/css", express.static(path.resolve(global.root_path + "/www/css")));
	app.use("/fonts", express.static(path.resolve(global.root_path + "/www/fonts")));
	app.use("/modules", express.static(path.resolve(global.root_path + "/modules")));
	//app.use("/vendor", express.static(path.resolve(global.root_path + "/vendor")));
	//app.use("/translations", express.static(path.resolve(global.root_path + "/translations")));

  //app.use(express.static(path.resolve(global.root_path + "/www")));
	/*
	for (var m in config.modules) {
		app.use(m.name, express.static(path.resolve(global.root_path + '/modules/'+ name +'/template.html'));
	}  
	*/
	
	
	app.get("/version", function(req,res) {
		res.send(global.version);
	});

	app.get("/", function(req, res) {
		var html = fs.readFileSync(path.resolve(global.root_path + "/index.html"), {encoding: "utf8"});
		html = html.replace("#VERSION#", global.version);

		res.send(html);
	});

	if (typeof callback === "function") {
		callback(app, io);
	}
};

module.exports = Server;
