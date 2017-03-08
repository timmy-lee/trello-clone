var CardsView = Backbone.View.extend({
  template: App.templates.cards,
  render: function() {
    $('main').find('ul[data-id=' + this.id + ']').html(this.template({
      card: JSON.parse(JSON.stringify(this.collection))
    }));
  },
  initialize: function() {
    this.render();
  }
});