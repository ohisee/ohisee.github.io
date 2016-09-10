/**
 * This is config file.
 */
requirejs.config({
	baseUrl: "static/js",
	paths: {
		"jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min",
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
		"backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
		"localstorage": "https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min",
		"requiretext": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
		"app": "todo",
		"todos": "todos",
		"todoappview": "todoappview",
		"todoview": "todoview",
		"todorouter": "todorouter",
		"todovars": "todovars"
	}
});

/**
 * This is todo app js.
 */
require(["app",
		"todoappview",
		"todorouter"
	],
	function(app, todoappview, todorouter) {
		console.log("Start Todo App");
		new app.AppView();
	});
