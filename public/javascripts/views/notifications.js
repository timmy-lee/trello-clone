var NotificationsView = Backbone.View.extend({
  el: $('ul.notifications').get(0),
  template: App.templates.notifications,
  render: function() {
    $('ul.notifications').html(this.template({
      notifications: this.collection.toJSON(),
    }))
  },
  remove: function() {
    this.undelegateEvents();
    $('ul.notifications').html('').hide();
  },
  initialize: function() {
    this.render();
  }
});