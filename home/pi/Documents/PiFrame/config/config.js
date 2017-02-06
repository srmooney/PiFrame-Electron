var config = {
	port: 8080,
	startPage: '/gallery.html',
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
	language: 'en',
	timeFormat: 24,
	units: 'metric',
	modules: [
		{
			name: 'gallery',	
			config: { text: 'Hello Sean' }
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
