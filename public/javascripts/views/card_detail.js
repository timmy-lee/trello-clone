var CardDetailView = Backbone.View.extend({
  el: $('main'),
  template: App.templates.card_details,
  events: {
    'click #header img.close': 'closeModal',
    'blur #header textarea': 'editCardName',
    'click li.subscribe': 'toggleSubscription',
    'click li.labels': 'showLabels',
    'click li.due': 'showDatePopup',
    'click li.move': 'showMovePopup',
    'change #lists_of_lists': 'changePositionOptions',
    'click #move_card_popup input': 'moveCard',
    'click li.archive': 'archiveCard',
    'click #label_popup img.close': 'closeLabels',
    'click #date_popup img.close': 'closeDatePopup',
    'click #move_card_popup img.close': 'closeAllPopups',
    'click #copy_card_popup img.close': 'closeAllPopups',
    'click .label span': 'toggleLabel',
    'submit #comments form': 'submitComment',
    'click #card_description a': 'showDescriptionEditForm',
    'click #card_description img.close': 'closeDescriptionEditForm',
    'submit #card_description form': 'updateDescription',
    'change #day': 'checkValidDate',
    'change #month': 'checkValidDate',
    'submit #date_popup form': 'setDueDate',
    'click #date_popup input[type=button]': 'removeDueDate',
    'click li.copy': 'showCopyPopup',
    'click #copy_card_popup input': 'copyCard',
    'change #lists_of_lists_for_copy': 'changeCopyPositionOptions'
  },
  render: function() {
    $('#overlay').show();
    $('#overlay').after(this.template(this.model.toJSON()));
  },
  remove: function() {
    this.undelegateEvents();

    $('#overlay').hide();
    $('#card_details').remove();
  },
  closeModal: function(e) {
    this.remove();
  },
  closeAllPopups: function(e) {
    $('#label_popup').hide();
    $('#date_popup').hide();
    $('#move_card_popup').hide();
    $('#copy_card_popup').hide();
  },
  editCardName: function(e) {
    var newCardName = $(e.target).val();
    App.trigger('editCardName', newCardName)
  },
  showDescriptionEditForm: function(e) {
    e.preventDefault();
    $(e.target).hide();
    $('#card_description p').hide();
    $('#card_description form').show();
  },
  closeDescriptionEditForm: function(e) {
    $('#card_description form').hide();
    $('#card_description a').show();
    $('#card_description p').show();
  },
  updateDescription: function(e) {
    e.preventDefault();
    var descriptionBody = $(e.target).find('textarea').val();

    App.trigger('updateCardDescription', descriptionBody);
    this.closeDescriptionEditForm();
  },
  submitComment: function(e) {
    e.preventDefault();
    var commentBody = $(e.target).find('textarea').val();

    if (commentBody) {
      App.trigger('postComment', commentBody);
    }
  },
  showLabels: function(e) {
    e.preventDefault();
    this.closeAllPopups();
    var $li = $(e.target).closest('li');
    var position = $li.position();

    $('#label_popup').css({
      'display': 'inline-block',
      'top': position.top + $li.outerHeight(),
      'left': position.left
    });
  },
  closeLabels: function(e) {
    $('#label_popup').hide();
  },
  showDatePopup: function(e) {
    e.preventDefault();
    this.closeAllPopups();
    var $li = $(e.target).closest('li');
    var position = $li.position();

    $('#date_popup').css({
      'display': 'inline-block',
      'top': position.top + $li.outerHeight(),
      'left': position.left
    });
  },
  closeDatePopup: function(e) {
    $('#date_popup').hide();
  },
  toggleLabel: function(e) {
    var color = $(e.target).attr('data-color');

    App.trigger('updateLabel', color);
  },
  checkValidDate: function(e) {
    var month = $('#month').val();
    var day = $('#day').val();
    var questionableMonths = ['Feb', 'Apr', 'Jun', 'Sep', 'Nov'];

    if (month === 'Feb' && day === '29' || month === 'Feb' && day === '30' || month === 'Feb' && day === '31') {
      $('#error').show();
      this.validDate = false;
    } else if (questionableMonths.indexOf(month) !== -1 && day === '31') {
      $('#error').show();
      this.validDate = false;
      return;
    } else {
      $('#error').hide();
      this.validDate = true;
    }
  },
  setDueDate: function(e) {
    e.preventDefault();
    if (!this.validDate) { return; }
    var month = $('#month').val();
    var day = $('#day').val();
    var time = $('#time').val();
    var date = month + ' ' + day + ' ' + time;

    App.trigger('setDueDate', date);
  },
  removeDueDate: function(e) {
    App.trigger('setDueDate', '');
  },
  showMovePopup: function(e) {
    e.preventDefault();
    this.closeAllPopups();
    var $li = $(e.target).closest('li');
    var position = $li.position();
    var length = App.lists.cardCounts[0].length;

    $('#card_details').append(App.templates.move_card({
    }));

    App.listNames.forEach(function(obj) {
      $('#lists_of_lists').append($('<option></option>').attr('value', obj.name).text(obj.name).attr('data-id', obj.id));
    });

    for (var i = 1; i <= length + 1; i++) {
      $('#card_positions').append($('<option></option>').attr('value', i).text(i));
    }

    $('#move_card_popup').css({
      'display': 'inline-block',
      'top': position.top + $li.outerHeight(),
      'left': position.left
    });
  },
  changePositionOptions: function(e) {
    var selectedListNameId = +$('#lists_of_lists option:selected').attr('data-id');
    var selectedListLength = App.lists.cardCounts.filter(function(list) {
      return list.id === selectedListNameId;
    })[0].length;

    $('#card_positions').empty();
    for (var i = 1; i <= selectedListLength + 1; i++) {
      $('#card_positions').append($('<option></option>').attr('value', i).text(i));
    }
  },
  moveCard: function(e) {
    var cardId = +$('#card_details').attr('data-id');
    var targetListId = +$('#lists_of_lists option:selected').attr('data-id');
    var targetPosition = +$('#card_positions').val();

    App.trigger('moveCard', targetListId, targetPosition, cardId);
  },
  showCopyPopup: function(e) {
    e.preventDefault();
    this.closeAllPopups();
    var $li = $(e.target).closest('li');
    var position = $li.position();
    var length = App.lists.cardCounts[0].length;

    App.listNames.forEach(function(obj) {
      $('#lists_of_lists_for_copy').append($('<option></option>').attr('value', obj.name).text(obj.name).attr('data-id', obj.id));
    });

    for (var i = 1; i <= length + 1; i++) {
      $('#card_positions_for_copy').append($('<option></option>').attr('value', i).text(i));
    }

    $('#copy_card_popup').css({
      'display': 'inline-block',
      'top': position.top + $li.outerHeight(),
      'left': position.left
    });
  },
  changeCopyPositionOptions: function(e) {
    var selectedListNameId = +$('#lists_of_lists_for_copy option:selected').attr('data-id');
    var selectedListLength = App.lists.cardCounts.filter(function(list) {
      return list.id === selectedListNameId;
    })[0].length;

    $('#card_positions_for_copy').empty();
    for (var i = 1; i <= selectedListLength + 1; i++) {
      $('#card_positions_for_copy').append($('<option></option>').attr('value', i).text(i));
    }
  },
  copyCard: function(e) {
    var targetListId = +$('#lists_of_lists_for_copy option:selected').attr('data-id');
    var targetPosition = +$('#card_positions_for_copy').val();
    var copiedCardName = $(e.target).closest('div').find('textarea').val();
    var cardId = +$('#card_details').attr('data-id');
    App.trigger('copyCard', targetListId, targetPosition, copiedCardName, cardId);
  },
  archiveCard: function(e) {
    App.trigger('archiveCard');
  },
  toggleSubscription: function(e) {
    App.trigger('toggleSubscription');
  },
  initialize: function() {
    this.render();
    this.id = +$('#card_details').attr('data-id');
  }
});