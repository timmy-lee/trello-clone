var QuickEditView = Backbone.View.extend({
  el: $('main'),
  template: App.templates.quickedit,
  events: {
    'click #with_button input[type=button]': 'editCardName',
    'click #quickedit li.edit_labels': 'showLabels',
    'click #label_popup img.close': 'closeLabels',
    'click .label span': 'toggleLabel',
    'click #quickedit li.due': 'showDatePopup',
    'change #day': 'checkValidDate',
    'change #month': 'checkValidDate',
    'submit #date_popup form': 'setDueDate',
    'click #date_popup input[type=button]': 'removeDueDate',
    'click #date_popup img.close': 'closeDatePopup',
    'click #quickedit_actions li.archive': 'archiveCard',
    'click #quickedit_actions li.move': 'showMovePopup',
    'change #lists_of_lists': 'changePositionOptions',
    'click #move_card_popup input': 'moveCard',
    'click #quickedit_actions li.copy': 'showCopyPopup',
    'click #copy_card_popup img.close': 'closeAllPopups',
    'click #copy_card_popup input': 'copyCard',
    'change #lists_of_lists_for_copy': 'changeCopyPositionOptions'
  },
  render: function() {
    $('#overlay').show();
    $('#overlay').after(this.template(this.model.toJSON()));
    $('#quickedit').css({
      'top': this.position.top,
      'left': this.position.left
    });
  },
  remove: function() {
    this.undelegateEvents();
    $('#overlay').hide();
    $('#quickedit').remove();
  },
  closeAllPopups: function(e) {
    $('#label_popup').hide();
    $('#date_popup').hide();
    $('#move_card_popup').hide();
    $('#copy_card_popup').hide();
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
  toggleLabel: function(e) {
    var color = $(e.target).attr('data-color');

    App.trigger('updateLabel', color);
  },
  closeLabels: function(e) {
    $('#label_popup').hide();
  },
  editCardName: function(e) {
    var newName = $(e.target).closest('div').find('textarea').val()
    App.trigger('editCardName', newName);
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
  closeDatePopup: function(e) {
    $('#date_popup').hide();
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
    var selectedListNameId = +$('#lists_of_lists option:selected').attr('data-id')
    var selectedListLength = App.lists.cardCounts.filter(function(list) {
      return list.id === selectedListNameId;
    })[0].length;

    $('#card_positions').empty();
    for (var i = 1; i <= selectedListLength + 1; i++) {
      $('#card_positions').append($('<option></option>').attr('value', i).text(i));
    }
  },
  moveCard: function(e) {
    var cardId = +$('#quickedit').attr('data-id');
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
    var cardId = +$('#quickedit').attr('data-id');
    App.trigger('copyCard', targetListId, targetPosition, copiedCardName, cardId);
  },
  archiveCard: function(e) {
    App.trigger('archiveCard');
  },
  initialize: function(options) {
    this.position = options.position;
    this.render();
  }
});