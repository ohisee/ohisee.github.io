/**
 * This is collection todos.js
 */
define(["backbone", "localstorage", "app"], function(Backbone, LocalStorage, app) {

	console.log("Todos Collection");

	var TodoList = Backbone.Collection.extend({
		model: app.Todo,
		localStorage: new LocalStorage('todos-backbone'),
		completed: function() {
			return this.filter(function(todoModel) {
				return todoModel.getCompletedVal();
			});
		},
		remaining: function() {
			return this.reject(function(todoModel) {
				return todoModel.getCompletedVal() === true;
			});
		},
		nextOrder: function() {
			if(!this.length) {
				return 1;
			}
			return this.last().get("order") + 1;
		},
		comparator: function(todoModel) {
			return todoModel.get("order");
		}
	});

	app.Todos = new TodoList();
});
