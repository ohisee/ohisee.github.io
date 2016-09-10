/**
 * This is todo view and in charge of individual todo record, making sure
 * the view updates when the todo does.
 */
define(["underscore", "backbone",
		"app", "todovars",
		"requiretext!templates/item-template.html"
	],
	function(_, Backbone, app, vars, itemTemplate) {

		console.log("Todo View");

		app.TodoView = Backbone.View.extend({
			//... is a list tag.
			tagName: "li",

			// Cache the template function for a single item.
			template: _.template(itemTemplate),

			// The DOM events specific to an item.
			events: {
				'click .toggle': 'toggleCompleted',
				'dblclick label': 'edit',
				'click .destroy': 'clear',
				'keypress .edit': 'updateOnEnter',
				'blur .edit': 'close'
			},

			// The TodoView listens for changes to its model, re-rendering. Since there's
			// a one-to-one correspondence between a **Todo** and a **TodoView** in this
			// app, we set a direct reference on the model for convenience.
			initialize: function() {
				this.listenTo(this.model, "change", this.render);
				this.listenTo(this.model, "destroy", this.remove);
				this.listenTo(this.model, "visible", this.toggleVisible);
			},

			// Re-renders the titles of the todo item.
			render: function() {
				this.$el.html(this.template(this.model.attributes));
				this.$el.toggleClass("completed", this.model.getCompletedVal());
				this.toggleVisible();
				this.$input = this.$(".edit");
				return this;
			},

			// Toggles visibility of item
			toggleVisible: function() {
				this.$el.toggleClass("hidden", this.isHidden());
			},

			// Determines if item should be hidden
			isHidden: function() {
				var isCompleted = this.model.getCompletedVal();
				return( // hidden cases only
					(!isCompleted && app.TodoFilter === "completed") ||
					(isCompleted && app.TodoFilter === "active")
				);
			},

			// Toggle the `"completed"` state of the model.
			toggleCompleted: function() {
				this.model.toggle();
			},

			// Switch this view into `"editing"` mode, displaying the input field.
			edit: function() {
				this.$el.addClass("editing");
				this.$input.attr("maxlength", vars.MAX_ITEM_CHARS_LENGTH);
				this.$input.focus();
			},

			// Close the `"editing"` mode, saving changes to the todo.
			close: function() {
				var value = this.$input.val().trim();
				if(value) {
					this.model.saveTitle(value);
				} else {
					this.clear();
				}
				this.$el.removeClass("editing");
			},

			// If you hit `enter`, we're through editing the item.
			updateOnEnter: function(event) {
				if(event.which === vars.ENTER_KEY) {
					this.close();
				}
			},

			// Remove the item, destroy the model from *localStorage* and delete its view.
			clear: function() {
				this.model.destroy();
			}
		});

	});
