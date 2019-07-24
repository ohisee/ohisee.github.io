/**
 * This is Gruntfile to build requirejs.
 */
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			compile: {
				options: {
					//"appDir": "./static/www",
					"baseUrl": "./static/www/js",
					//"dir": "./static/todo_build",
					"optimize": "uglify2",
					"mainConfigFile": "./static/www/js/todoappconfig.js",
					"paths": {
						"requiretext": "lib/text"
					},
					"include": ["todoappconfig.js",
						"todoapp/todo",
						"todoapp/todos",
						"todoapp/todoappview",
						"todoapp/todorouter",
						"todoapp/todovars",
						"todoapp/todoview",
						"requiretext!templates/stats-template.html",
						"requiretext!templates/item-template.html"
					],
					"out": "./static/todoapp-min.js",
					//"keepBuildDir": false,
					"logLevel": 0,
					"preserveLicenseComments": true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");
};
