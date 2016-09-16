/**
 * This is config file.
 */
requirejs.config({
	//baseUrl: "js",
	paths: {
		"jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min",
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
		"backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
		"localstorage": "https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min",
		"requiretext": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min"
	}
});

/**
 * This is todo app js.
 */
requirejs([
		"todoapp/todo",
		"todoapp/todos",
		"todoapp/todoview",
		"todoapp/todoappview",
		"todoapp/todorouter",
		"todoapp/todovars"
	],
	function(app, b, c, d, e, f) {
		console.log("Start Todo App");
		new app.AppView();
	});
