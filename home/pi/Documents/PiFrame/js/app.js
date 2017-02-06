/* Magic Mirror
 * The Core App (Server)
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var fs = require("fs");
var Server = require(__dirname + "/server.js");
var path = require("path");

// Get version number.
global.version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
console.log("Starting PiFrame: v" + global.version);

// global absolute root path
global.root_path = path.resolve(__dirname + "/../");

// The next part is here to prevent a major exception when there
// is no internet connection. This could probable be solved better.
process.on("uncaughtException", function (err) {
	console.log("Whoops! There was an uncaught exception...");
	console.error(err);
	console.log("PiFrame will not quit, but it might be a good idea to check why this happened. Maybe no internet connection?");
});

/* App - The core app.
 */
var App = function() {
	var nodeHelpers = [];

	/* loadConfig(callback)
	 * Loads the config file. combines it with the defaults,
	 * and runs the callback with the found config as argument.
	 *
	 * argument callback function - The callback function.
	 */
	var loadConfig = function(callback) {
		console.log("Loading config ...");
		var configFilename = path.resolve(global.root_path + "/config/config.js");
		try {
			fs.accessSync(configFilename, fs.F_OK);
			var config = require(configFilename);
			callback(config);
		} catch (e) {
			if (e.code == "ENOENT") {
				console.error("WARNING! Could not find config file. Please create one. Starting with default configuration.", e);
				//callback(defaults);
			} else if (e instanceof ReferenceError || e instanceof SyntaxError) {
				console.error("WARNING! Could not validate config file. Please correct syntax errors. Starting with default configuration.", e);
				//callback(defaults);
			} else {
				console.error("WARNING! Could not load config file. Starting with default configuration. Error found: " + e);
				//callback(defaults);
			}
		}
	};


	/* start(callback)
	 * This methods starts the core app.
	 * It loads the config, then it loads all modules.
	 * When it"s done it executs the callback with the config as argument.
	 *
	 * argument callback function - The callback function.
	 */
	this.start = function(callback) {

		loadConfig(function(c) {
			config = c;

			var server = new Server(config, function(app, io) {
				console.log("Server started ...");
        /*
				for (var h in nodeHelpers) {
					var nodeHelper = nodeHelpers[h];
					nodeHelper.setExpressApp(app);
					nodeHelper.setSocketIO(io);
					nodeHelper.start();
				}
        */
				console.log("Sockets connected & modules started ...");

				if (typeof callback === "function") {
					callback(config);
				}

			});
		});
	};
};

module.exports = new App();
