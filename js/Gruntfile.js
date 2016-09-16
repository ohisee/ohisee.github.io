/**
 * This is Gruntfile to build requirejs.
 */
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		requirejs: {
			compile: {
				options: {
					"appDir": "./static/www",
					"baseUrl": "js",
					"dir": "./static/todo_build",
					"optimize": "uglify2",
					"mainConfigFile": "./static/www/js/todoappconfig.js",
					"paths": {
						"requiretext": "lib/text"
					},
					"modules": [{
						"name": "todoappconfig"
					}],
					"keepBuildDir": false,
					"logLevel": 0,
					"preserveLicenseComments": false
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-requirejs");
};
