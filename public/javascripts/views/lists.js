var ListsView = Backbone.View.extend({
  el: $('ul.list').get(0),
  events: {
    'click div.add_card': 'showNewCardForm',
    'submit form.add_card': 'addCard',
    'keyup textarea.add_card': 'addCardByEnter',
    'click .heading_wrapper p': 'showEditNameForm',
    'blur input.edit_name_field': 'hideEditNameForm',
    'click li.card': 'viewDetails',
    'click .heading_wrapper span': 'showListOptions',
    'click #list_action_popup img.close': 'closeListOptions',
    'click li.add_card': 'showNewCardFormFromOptions',
    'click li.subscribe': 'toggleSubscription',
    'click li.archive_cards_from_list': 'archiveCards',
    'click li.archive_list': 'archiveList',
    'click li.copy_list': 'showCopyListOptions',
    'click #copy_list_popup img.close': 'hideCopyListOptions',
    'submit #copy_list_popup form': 'copyList',
    'click li.move_cards_from_list': 'showMoveOptions',
    'click #move_all_cards_popup img.close': 'hideMoveOptions',
    'click #move_all_cards_popup li': 'moveCards',
    'click img.quickedit': 'openQuickEdit',
    'click li.move_list': 'showMoveListOptions',
    'click #move_list_popup img.close': 'hideMoveListOptions',
    'click #move_list_popup input': 'moveList',
    'click form.add_card': 'stopPropagation',
    'click #copy_list_popup': 'stopPropagation',
    'click #move_list_popup': 'stopPropagation',
    'click #move_all_cards_popup': 'stopPropagation',
    'click #list_action_popup': 'stopPropagation',
  },
  template: App.templates.lists,
  render: function() {
    this.$el.html(this.template({ list: this.collection.toJSON() }))
  },
  remove: function() {
    this.undelegateEvents();
    this.$el.html('');
  },
  stopPropagation: function(e) {
    e.stopPropagation();
  },
  viewDetails: function(e) {
    var cardId = +$(e.target).closest('li').attr('data-id');
    App.trigger('viewCardDetails', cardId);
  },
  openQuickEdit: function(e) {
    e.stopPropagation();
    var $target = $(e.target)
    var cardId = +$target.closest('li').attr('data-id');
    var position = $target.closest('li').position();
    parseInt($target.closest('li').css('margin-left'));
    position.left = position.left + parseInt($target.closest('li').css('margin-left'));

    App.trigger('openQuickEdit', cardId, position);
  },
  showNewCardForm: function(e) {
    e.stopPropagation();
    var $target = $(e.target);
    $target.hide().next().show();
    $target.next().find('textarea').focus();
  },
  showNewCardFormFromOptions(e) {
    var listId = $(e.target).closest('div').attr('data-id');
    var $list = $('li.list[data-id=' + listId + ']');
    this.closeListOptions();

    $list.find('div.add_card').hide().next().show();
  },
  toggleSubscription: function(e) {
    var listId = +$(e.target).closest('div').attr('data-id');

    App.trigger('toggleListSubscription', listId);
  },
  archiveCards: function(e) {
    var listId = +$(e.target).closest('div').attr('data-id');

    App.trigger('archiveAllCards', listId);
  },
  archiveList: function(e) {
    var listId = +$(e.target).closest('div').attr('data-id');
    this.archiveCards(e);

    App.trigger('archiveList', listId);
  },
  addCard: function(e) {
    e.preventDefault();
    var listId = +$(e.target).attr('data-id');
    var cardContent = $(e.target).find('textarea').val();

    if (!cardContent) {
      return;
    }

    App.trigger('new_card', listId, cardContent);
    e.target.reset();
  },
  addCardByEnter: function(e) {
    var $form = $(e.target).closest('form');
    if (e.keyCode === 13) {
      $form.submit();
    }
  },
  showEditNameForm: function(e) {
    var $target = $(e.target);
    $target.hide();
    $target.next().show();
    this.currentId = +$target.attr('data-id');
  },
  hideEditNameForm: function(e) {
    $(e.target).hide();
    $(e.target).prev().show();
    App.trigger('list_name_change', $(e.target).val(), this.currentId);
  },
  showListOptions: function(e) {
    e.stopPropagation();
    var $span = $(e.target);
    var listId = $span.closest('li').attr('data-id');
    var position = $span.position();

    $('#list_action_popup').css({
      'display': 'inline-block',
      'top': position.top + $span.outerHeight(),
      'left': position.left
    }).attr('data-id', listId);
  },
  closeListOptions: function(e) {
    $('#list_action_popup').hide();
  },
  showMoveOptions: function(e) {
    var $list_action_popup = $('#list_action_popup');
    var listId = $list_action_popup.attr('data-id');
    var position = $list_action_popup.position();
    $list_action_popup.hide();

    $('#move_all_cards_popup').css({
      'display': 'inline-block',
      'top': position.top,
      'left': position.left
    }).attr('data-id', listId);
  },
  hideMoveOptions: function(e) {
    e.stopPropagation();
    $('#move_all_cards_popup').hide();
    $('#list_action_popup').show();
  },
  moveCards: function(e) {
    var currentListId = +$('#list_action_popup').attr('data-id');
    var targetListId = +$(e.target).attr('data-id');

    $('#move_all_cards_popup').hide();
    App.trigger('moveCards', targetListId, currentListId);
  },
  showCopyListOptions: function() {
    var $list_action_popup = $('#list_action_popup');
    var listId = $list_action_popup.attr('data-id');
    var position = $list_action_popup.position();
    $list_action_popup.hide();

    $('#copy_list_popup textarea').text()

    $('#copy_list_popup').css({
      'display': 'inline-block',
      'top': position.top,
      'left': position.left
    }).attr('data-id', listId);
  },
  hideCopyListOptions: function(e) {
    e.stopPropagation();
    $('#copy_list_popup').hide();
    $('#list_action_popup').show();
  },
  copyList: function(e) {
    e.preventDefault();
    var newListName = $(e.target).find('textarea').val();
    var listId = +$('#copy_list_popup').attr('data-id');

    App.trigger('copyList', newListName, listId);
  },
  showMoveListOptions: function() {
    var $list_action_popup = $('#list_action_popup');
    var listId = $list_action_popup.attr('data-id');
    var position = $list_action_popup.position();
    $list_action_popup.hide();

    $('#list_positions').html('');
    for (var i = 1; i <= App.lists.models.length; i++) {
      $('#list_positions').append($('<option></option>').attr('value', i).text(i));
    }

    $('#move_list_popup').css({
      'display': 'inline-block',
      'top': position.top,
      'left': position.left
    }).attr('data-id', listId);
  },
  hideMoveListOptions: function(e) {
    e.stopPropagation();
    $('#move_list_popup').hide();
    $('#list_action_popup').show();
  },
  moveList: function(e) {
    var position = +$('#list_positions option:selected').val();
    var listId = +$('#move_list_popup').attr('data-id');
    console.log(listId);
    App.trigger('moveList', position, listId);
  },
  resetFormViews: function(e) {
    var $target = $(e.target);
    $target.closest('div').hide();
    $target.closest('div').prev().show();
  },
  initialize: function() {
    this.render();
  }
});