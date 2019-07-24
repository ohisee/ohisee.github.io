/**
 * This is model todo.js
 */
define(["backbone"], function(Backbone) {

	console.log("Todo");

	var app = app || {};

	app.Todo = Backbone.Model.extend({
		defaults: {
			"title": "",
			"completed": false
		},
		toggle: function() {
			this.save({
				"completed": !this.get("completed")
			});
		},
		getCompletedVal: function() {
			return this.get("completed");
		},
		saveTodo: function(completed) {
			this.save({
				"completed": completed
			});
		},
		saveTitle: function(title) {
			this.save({
				"title": title
			});
		}
	});

	return app;
});
