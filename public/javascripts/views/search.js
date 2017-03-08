var SearchResultsView = Backbone.View.extend({
  el: $('#search_results ul').get(0),
  events: {
    'click li.card': 'viewDetails'
  },
  template: App.templates.cards,
  render: function() {
    $('#search_results ul').html(this.template({ card: JSON.parse(JSON.stringify(this.collection)) }));
  },
  remove: function() {
    this.undelegateEvents();

    $('#search_results ul').html('');
  },
  viewDetails: function(e) {
    e.stopPropagation();
    $('#search_results').hide()
    var cardId = +$(e.target).closest('li').attr('data-id');
    App.trigger('viewCardDetails', cardId);
  },
  initialize: function() {
    this.render();
  }
});