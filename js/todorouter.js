/**
 * This is todo router.
 */
define(["backbone", "app", "todos"],
	function(Backbone, app, todos) {

		console.log("Todo Router");

		var Workspace = Backbone.Router.extend({
			routes: {
				"help": "showHelp",
				"*filter": "setFilter" // Default router for all *
			},

			showHelp: function() {
				console.log("Help on its way");
			},

			setFilter: function(param) {
				if(param) {
					param = param.trim();
				}
				app.TodoFilter = param || '';
				// Trigger a collection filter event, causing hiding/unhiding of Todo view items.
				// See AppView.listenTo(app.Todos, 'filter', this.filterAll)
				app.Todos.trigger("filter");
			}
		});

		app.TodoRouter = new Workspace();
		Backbone.history.start();
	});
