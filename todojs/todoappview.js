/**
 * This is todos app view and handles the creation of new todos and rendering
 * of the initial todo list.
 */
define(["underscore", "backbone", "app",
		"todos", "todoview", "todovars",
		"requiretext!templates/stats-template.html"
	],
	function(_, Backbone, app, todos, todoview, vars, statsTemplate) {

		console.log("App View");

		app.AppView = Backbone.View.extend({
			// Instead of generating a new element, bind to the existing skeleton of
			// the App already present in the HTML, <section id="todoapp">.
			el: '#todoapp',

			// Our template for the line of statistics at the bottom of the app.
			statsTemplate: _.template(statsTemplate),

			// Delegated events for creating new items, and clearing completed ones.
			events: {
				'keypress #new-todo': 'createOnEnter',
				'click #clear-completed': 'clearCompleted',
				'click #toggle-all': 'toggleAllComplete'
			},

			// At initialization we bind to the relevant events on the `Todos`
			// collection, when items are added or changed. Kick things off by
			// loading any preexisting todos that might be saved in *localStorage*.
			initialize: function() {
				this.allCheckbox = this.$('#toggle-all')[0];
				this.$input = this.$('#new-todo');
				this.$footer = this.$('#footer');
				this.$main = this.$('#main');
				this.$msg = this.$('#todomsg');

				this.listenTo(app.Todos, 'add', this.addOne);
				this.listenTo(app.Todos, 'reset', this.addAll);
				this.listenTo(app.Todos, 'change:completed', this.filterOne);
				this.listenTo(app.Todos, 'filter', this.filterAll);
				this.listenTo(app.Todos, 'all', this.render);
				this.listenTo(app.Todos, "warning", this.warningMessage);

				app.Todos.fetch({ reset: true });
				this.allCheckbox.checked = false;
				this.$input.attr("maxlength", vars.MAX_ITEM_CHARS_LENGTH);
			},

			// Re-rendering the App just means refreshing the statistics -- the rest
			// of the app doesn't change.
			render: function() {
				var completed = app.Todos.completed().length;
				var remaining = app.Todos.remaining().length;

				if(app.Todos.length) {
					this.$main.show();
					this.$footer.show();

					this.$footer.html(this.statsTemplate({
						"completed": completed,
						"remaining": remaining
					}));

					this.$('#filters li a')
						.removeClass('selected')
						.filter('[href="#/' + (app.TodoFilter || '') + '"]')
						.addClass('selected');

				} else {
					this.$main.hide();
					this.$footer.hide();
				}

				this.allCheckbox.checked = !remaining;
			},

			// Add a new todo model and create a new todo view.
			// Add a single todo item to the list by creating a view for it, and
			// appending its element to the `<ul>`.
			// Triggered by createOnEnter
			addOne: function(todo) {
				var view = new app.TodoView({ model: todo });
				$('#todo-list').append(view.render().el);
			},

			// Add all items in the **Todos** collection at once.
			addAll: function() {
				this.$('#todo-list').html('');
				app.Todos.each(this.addOne, this);
			},

			filterOne: function(todo) {
				todo.trigger('visible');
			},

			filterAll: function() {
				app.Todos.each(this.filterOne, this);
			},

			// Generate the attributes for a new Todo item.
			newAttributes: function() {
				return {
					"title": this.$input.val().trim(),
					"order": app.Todos.nextOrder(),
					"completed": false
				};
			},

			// If you hit return in the main input field, create new Todo model,
			// persisting it to localStorage.
			// Creating a model will cause an immediate "add" event to be triggered on the collection
			createOnEnter: function(event) {
				if(event.which !== vars.ENTER_KEY || !this.$input.val().trim()) {
					return;
				}
				if(app.Todos.length < vars.MAX_ITEM_ALLOWED) {
					app.Todos.create(this.newAttributes());
				} else {
					app.Todos.trigger("warning");
				}
				this.$input.val('');
			},

			// Clear all completed todo items, destroying their models.
			clearCompleted: function() {
				_.invoke(app.Todos.completed(), "destroy");
				return false;
			},

			// Toggle all complete
			toggleAllComplete: function() {
				var completed = this.allCheckbox.checked;
				app.Todos.each(function(todo) {
					todo.saveTodo(completed);
				});
			},

			// Produce waring message
			warningMessage: function() {
				if(app.Todos.length >= vars.MAX_ITEM_ALLOWED) {
					this.$msg.show();
					this.$msg.html(vars.MAX_ITEM_REACHED_MSG).css({
						"font-size": "13px",
						"font-style": "italic",
						"color": "rgba(107, 38, 20, 0.75)",
						"border-bottom": "2px ridge rgba(153, 153, 153, 0.2)"
					});
					this.$msg.fadeOut(vars.FADE_DURATION);
				}
			}
		});

	});
