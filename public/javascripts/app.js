var App = {
  listIDs: new Array(),
  templates: JST,
  $el: $('main'),
  twoDigits: function(num) {
    return num > 9 ? '' + num : '0' + num;
  },
  formatDate: function(date) {
    var year = date.getFullYear();
    var month = this.twoDigits(date.getMonth() + 1);
    var day = this.twoDigits(date.getDate());
    var hour = this.twoDigits(date.getHours());
    var minute = this.twoDigits(date.getMinutes());
    var seconds = this.twoDigits(date.getSeconds());

    return 'on ' + month + '/' + day + '/' + year + ' at ' + hour + ':' + minute + ':' + seconds;
  },
  ringBell: function() {
    $('img.bell').css({
      'background': '#ff5656'
    });
  },
  saveNotifications: function() {
    $.ajax({
      url: 'notification',
      type: 'POST',
      data: {
        notifications: JSON.stringify(this.notifications),
      }
    })
  },
  setCardPositions: function() {
    var self = this;
    this.setListPositions();

    self.listIDs.forEach(function(listId) {
      var cardsInList = self.cards.where({ listId: listId });
      var position = 1;
      cardsInList.forEach(function(model) {
        model.set('cardPosition', position)
        position++;
      });
    });

    this.cards.sort();
    this.setCardsCountInList();
  },
  setListPositions: function() {
    var position = 1;
    this.lists.models.forEach(function(list) {
      list.set('position', position);
      position++;
    });
  },
  setCardsCountInList: function() {
    App.lists.cardCounts = []
    this.lists.forEach(function(list) {
      var currentListId = list.get('id');
      var currentListName = list.get('name');
      var cardsInCurrentList = App.cards.where({ listId: currentListId }).length || 0;

      App.lists.cardCounts.push({
        name: currentListName,
        length: cardsInCurrentList,
        id: currentListId
      })
    });
  },
  renderListView: function() {
    if (this.lists.view) {
      this.lists.view.remove();
    }

    this.lists.view = new ListsView({
      collection: this.lists
    });

    $('ul.card').sortable({
      dropOnEmpty: true,
      connectWith: 'ul.card',
      receive: function(e, ui) {
        App.moveCardByDrop(+$(e.target).attr('data-id'));
      },
      stop: function(e) {
        App.moveCardByDrop(+$(e.target).attr('data-id'));
      }
    });
  },
  getAllListIds: function() {
    var self = this;
    this.lists.models.forEach(function(list) {
      self.listIDs.push(+list.attributes.id);
    });
  },
  getAllListNames: function() {
    this.listNames = [];
    this.lists.models.forEach(function(model) {
      App.listNames.push({
        name: model.get('name'),
        id: model.get('id')
      });
    });
  },
  renderCardsView: function() {
    var self = this;
    this.listIDs.forEach(function(id) {
      var currentListById = self.cards.where({ listId: id });
      new CardsView({
        collection: currentListById,
        id: id
      });
    });
  },
  addCard: function(id, content) {
    var currentList = this.lists.findWhere({ id: id });

    $.ajax({
      url: '/newcard',
      type: 'POST',
      data: {
        listId: id,
        name: content,
        activity: 'Timmy L. added this card to list ' + currentList.get('name') + ' ' + this.formatDate(new Date()),
        listName: currentList.get('name'),
      },
      success: function(json) {
        App.cards.add(json);
        App.setCardPositions();
        App.renderCardsView();
        if (currentList.get('subscribed')) {
          App.notifications.unshift({
            cardId: json.id,
            detail: 'Timmy L. added a new card to list: ' + currentList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  editListName: function(newName, id) {
    var currentList = this.lists.findWhere({ id: id });
    var cardsInCurrentList = this.cards.where({ listId: id });
    var oldName = currentList.get('name');
    currentList.set('name', newName);
    cardsInCurrentList.forEach(function(card) {
      card.set('listName', newName);
    });

    $.ajax({
      url: '/editname',
      type: 'POST',
      data: {
        content: JSON.stringify(App.lists.toJSON()),
      },
      success: function() {
        App.refreshAppDataOnListChange();
        App.renderListView();
        App.renderCardsView();
        if (currentList.get('subscribed')) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. renamed ' + oldName + ' to ' + newName + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      },
    })
  },
  createCardDetailView: function(cardId) {
    this.currentCard = this.cards.findWhere({ id: cardId });
    this.currentCard.view = new CardDetailView({
      model: this.currentCard
    });
  },
  toggleSubscription: function(cardId) {
    this.currentCard.set('subscribed', this.currentCard.get('subscribed') ? false : true);

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: { card: JSON.stringify(this.currentCard) },
      success: function() {
        App.refreshDetailsPage();
        App.renderCardsView();
      }
    });
  },
  toggleListSubscription: function(listId) {
    var currentList = this.lists.findWhere({ id: listId });
    currentList.set('subscribed', currentList.get('subscribed') ? false : true);

    $.ajax({
      url: 'listsubscription',
      type: 'POST',
      data: { list: JSON.stringify(currentList) },
      success: function() {
        App.renderListView();
        App.renderCardsView();
      }
    });
  },
  archiveList: function(listId) {
    var currentList = this.lists.findWhere({ id: listId });
    var listName = currentList.get('name');
    var subscribed = currentList.get('subscribed');
    this.lists.remove(currentList);

    $.ajax({
      url: 'archivelist',
      type: 'POST',
      data: {
        list: JSON.stringify(this.lists)
      },
      success: function() {
        App.refreshAppDataOnListChange();
        App.renderListView();
        App.renderCardsView();
        if (subscribed) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. archived list: ' + listName + ' ' + App.formatDate(new Date()),
          });

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  archiveAllCards: function(listId) {
    var currentList = this.lists.findWhere({ id: listId });
    var cardsFromCurrentList = this.cards.where({ listId: listId });
    cardsFromCurrentList = cardsFromCurrentList.map(function(model) {
      return model.toJSON();
    });

    cardsFromCurrentList.forEach(function(model) {
      App.cards.remove(model);
    });

    $.ajax({
      url: 'archivecard',
      type: 'POST',
      data: {
        cards: JSON.stringify(this.cards)
      },
      success: function() {
        App.renderListView();
        App.renderCardsView();
        if (currentList.get('subscribed')) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. archived all cards from list: ' + currentList.get('name') + ' ' + App.formatDate(new Date()),
          })
          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  postComment: function(commentBody) {
    this.currentCard.get('comments').push({
      commenter: 'Timmy Lee',
      comment: commentBody,
      time: this.formatDate(new Date())
    });

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: { card: JSON.stringify(this.currentCard) },
      success: function() {
        App.refreshDetailsPage();
        App.renderCardsView();
        if (App.currentCard.get('subscribed')) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. commented on card ' + App.currentCard.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  updateCardDescription: function(description) {
    this.currentCard.set('description', description);
    this.currentCard.get('activity').push({
      activity: 'Timmy L. updated this card\'s description ' + this.formatDate(new Date())
    });

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: {
        card: JSON.stringify(this.currentCard)
      },
      success: function() {
        App.renderCardsView();
        App.refreshDetailsPage();
        if (App.currentCard.get('subscribed')) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. updated the description of card: ' + App.currentCard.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.ringBell();
          App.saveNotifications();
        }
      }
    })
  },
  updateLabel: function(newLabel) {
    var existingLabels = []
    this.currentCard.get('labels').forEach(function(label) {
      existingLabels.push(label.color);
    });

    if (existingLabels.indexOf(newLabel) === -1) {
      this.currentCard.get('labels').push({ color: newLabel })
      this.currentCard.get('activity').push({
        activity: 'Timmy L. added a label ' + this.formatDate(new Date()),
      })
    } else {
      this.currentCard.set('labels', this.currentCard.get('labels').filter(function(label) {
        return label.color !== newLabel;
      }));
      this.currentCard.get('activity').push({
        activity: 'Timmy L. removed a label ' + this.formatDate(new Date()),
      })
    }

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: {
        card: JSON.stringify(this.currentCard),
      },
      success: function() {
        if ($('#card_details').length !== 0) {
          App.refreshDetailsPage();
        }
        if ($('#quickedit').length !== 0) {
          App.refreshQuickEditView();
        }

        App.renderCardsView();

        if (App.currentCard.get('subscribed')) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. updated a label on card: ' + App.currentCard.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  editCardName: function(newName) {
    var oldName = this.currentCard.get('name');
    this.currentCard.set('name', newName);
    this.currentCard.get('activity').push({
      activity: 'Timmy L. edited the name of this card from ' + '\"' + oldName + '\"' + ' to ' + '\"' + newName + '\"' + ' ' + this.formatDate(new Date())
    })

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: {
        card: JSON.stringify(this.currentCard),
      },
      success: function() {
        if ($('#card_details').length !== 0) {
          App.refreshDetailsPage();
        }
        if ($('#quickedit').length !== 0) {
          App.currentCard.quickEditView.remove();
        }

        App.renderCardsView();

        if (App.currentCard.get('subscribed')) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. changed the name on card: ' + oldName + ' ' + ' to ' + App.currentCard.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  setDueDate: function(date) {
    this.currentCard.set('due', date);
    if (date) {
      this.currentCard.get('activity').push({
        activity: 'Timmy L. set a due date for ' + date + ' ' + this.formatDate(new Date()),
      });
    } else {
      this.currentCard.get('activity').push({
        activity: 'Timmy L. removed due date ' + this.formatDate(new Date()),
      });
    }

    $.ajax({
      url: 'updatecard',
      type: 'POST',
      data: {
        card: JSON.stringify(this.currentCard),
      },
      success: function() {
        if ($('#card_details').length !== 0) {
          App.refreshDetailsPage();
        }
        if ($('#quickedit').length !== 0) {
          App.refreshQuickEditView();
        }

        App.renderCardsView();

        if (App.currentCard.get('subscribed')) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. set a due date ' + date + ' for card: ' + App.currentCard.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    })
  },
  archiveCard: function() {
    var subscribed = this.currentCard.get('subscribed');
    var cardName = this.currentCard.get('name');
    if (this.currentCard.view) {
      this.currentCard.view.closeModal();
    }
    this.cards.remove(this.currentCard);

    $.ajax({
      url: 'archivecard',
      type: 'POST',
      data: {
        cards: JSON.stringify(this.cards),
      },
      success: function() {
        App.renderCardsView();
        if (App.currentCard.quickEditView) {
          App.currentCard.quickEditView.remove();
        }

        if (subscribed) {
          App.notifications.unshift({
            cardId: App.currentCard.get('id'),
            detail: 'Timmy L. archived card: ' + cardName + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    })
  },
  moveSingleCard: function(targetListId, targetPosition, cardId) {
    var card = this.cards.findWhere({ id: cardId });
    var oldListName = card.get('listName');
    var sameList = targetListId === card.get('id');
    var targetList = this.lists.findWhere({ id: targetListId });
    var cardsInTargetList = this.cards.where({ listId: targetList.get('id') }).length;
    card.set('listId', targetList.get('id'));
    card.set('listName', targetList.get('name'));

    if (targetPosition > cardsInTargetList) {
      card.set('cardPosition', targetPosition);
    } else if (targetPosition === 1) {
      card.set('cardPosition', targetPosition - 1);
    } else if (sameList && card.get('cardPosition') < targetPosition) {
      card.set('cardPosition', targetPosition + .5);
    } else {
      card.set('cardPosition', targetPosition - .5);
    }
    card.get('activity').push({
      activity: 'Timmy L. moved ' + card.get('name') + ' from list ' + oldListName + ' to ' + targetList.get('name') + ' ' + this.formatDate(new Date()),
    });
    this.cards.sort();
    this.setCardPositions();

    $.ajax({
      url: 'movecard',
      type: 'POST',
      data: {
        cards: JSON.stringify(this.cards),
      },
      success: function() {
        if ($('#card_details').length !== 0) {
          App.refreshDetailsPage();
        }
        if (App.currentCard.quickEditView) {
          App.currentCard.quickEditView.remove();
        }
        App.setCardsCountInList();
        App.renderCardsView();

        if (card.get('subscribed')) {
          App.notifications.unshift({
            cardId: card.get('id'),
            detail: 'Timmy L. moved ' + card.get('name') + ' from list ' + oldListName + ' to ' + targetList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    })
  },
  moveCards: function(targetListId, currentListId) {
    var targetList = this.lists.findWhere({ id: targetListId })
    var targetListName = targetList.get('name');
    var targetListSubscribed = targetList.get('subscribed')
    var currentList = this.lists.findWhere({ id: currentListId })
    var currentListName = currentList.get('name');
    var currentListSubscribed = currentList.get('subscribed');
    var cards = this.cards.where({ listId: currentListId });

    cards.forEach(function(model) {
      model.set('listId', targetListId);
      model.get('activity').push({
        activity: 'Timmy L. moved this card from ' + '\"' + currentListName + ' to \"' + targetListName + '\" ' + App.formatDate(new Date())
      })
    });

    $.ajax({
      url: 'movecards',
      type: 'POST',
      data: {
        cards: JSON.stringify(this.cards)
      },
      success: function() {
        App.setCardPositions();
        App.renderCardsView();

        if (targetListSubscribed || currentListSubscribed) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. moved all cards from list: ' + currentListName + ' to list ' + targetListName + ' to ' + targetList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  copyCard: function(targetListId, targetPosition, cardName, cardId) {
    var copiedCard = this.cards.findWhere({ id: cardId }).clone();
    var targetList = this.lists.findWhere({ id: targetListId });
    var cardsInTargetList = this.cards.where({ listId: targetList.get('id') }).length;

    copiedCard.set('name', cardName);
    // copiedCard.set('cardPosition', targetPosition);
    copiedCard.set('listName', targetList.get('name'));
    copiedCard.set('listId', targetList.id);

    if (targetPosition >= cardsInTargetList) {
      copiedCard.set('cardPosition', targetPosition + 1);
    } else if (targetPosition === 1) {
      copiedCard.set('cardPosition', targetPosition - 1);
    } else {
      copiedCard.set('cardPosition', targetPosition - .5);
    }

    $.ajax({
      url: 'copycard',
      type: 'POST',
      data: {
        card: JSON.stringify(copiedCard),
      },
      success: function(json) {
        App.cards.add(json);
        App.cards.sort();
        App.setCardPositions();
        App.renderCardsView();

        // $.ajax({
        //   url: 'updatecard',
        //   type: 'POST',
        //   data: {
        //     cards: JSON.stringify(App.cards)
        //   }
        // })

        if (targetList.get('subscribed')) {
          App.notifications.unshift({
            cardId: json.id,
            detail: 'Timmy L. copied ' + copiedCard.get('name') + ' to list ' + targetList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  createQuickEditView: function(cardId, position) {
    this.currentCard = this.cards.findWhere({ id: cardId });
    this.currentCard.quickEditView = new QuickEditView({
      model: this.currentCard,
      position: position
    })
  },
  refreshDetailsPage: function() {
    this.currentCard.view.remove();
    this.currentCard.view = new CardDetailView({
      model: this.currentCard
    });
  },
  refreshQuickEditView: function() {
    var currentPosition = this.currentCard.quickEditView.position;
    this.currentCard.quickEditView.remove();
    this.currentCard.quickEditView = new QuickEditView({
      model: this.currentCard,
      position: currentPosition
    })
  },
  refreshAppDataOnListChange: function() {
    this.getAllListNames();
    this.getAllListIds();
    this.setListPositions();
    this.setCardsCountInList();
  },
  showNotifications: function(e) {
    e.stopPropagation();
    $('img.bell').css({
      'background': '#4691bc'
    })

    $('ul.notifications').show();

    this.notifications.view = new NotificationsView({
      collection: this.notifications
    })
  },
  showAddListForm: function(e) {
    $(this).hide();
    $(this).next().css('display', 'inline-block').hide().slideToggle();
  },
  addNewList: function(e) {
    e.preventDefault();
    var input = $('#add_list_form').val();

    if (!input) {
      return;
    }

    $.ajax({
      url: '/newlist',
      type: 'POST',
      data: {
        name: input
      },
      success: function(json) {
        App.lists.add(json);
        App.refreshAppDataOnListChange();
        App.renderListView();
        App.renderCardsView();
      }
    })
  },
  moveCardByDrop: function(listId) {
    var cardIds = []
    var targetList = this.lists.findWhere({ id: listId });
    var listName = targetList.get('name');
    $('ul[data-id=' + listId + ']').children().each(function(index, value) {
      cardIds.push(+$(value).attr('data-id'));
    });

    var cardsInList = []

    cardIds.forEach(function(id) {
      cardsInList.push(App.cards.findWhere({ id: id }));
    });

    cardsInList.forEach(function(card, index) {
      card.set('listName', listName);
      card.set('listId', listId);
      card.set('cardPosition', index + 1);
    })

    this.cards.sort();

    $.ajax({
      url: 'movecards',
      type: 'POST',
      data: {
        cards: JSON.stringify(this.cards)
      },
      success: function() {
        App.setCardPositions();
        App.renderCardsView();

        if (targetList.get('subscribed')) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. moved a card to list: ' + targetList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    });
  },
  moveListByDrop: function(elements) {
    var listIds = [];
    elements.each(function(index, value) {
      listIds.push(+$(value).attr('data-id'));
    })

    listIds.forEach(function(id, index) {
      App.lists.findWhere({ id: id }).set('position', index + 1);
    })
    this.lists.sort();

    $.ajax({
      url: '/updatelist',
      type: 'POST',
      data: {
        content: JSON.stringify(this.lists.toJSON()),
      },
      success: function() {
        App.renderListView();
        App.renderCardsView();
      }
    })
  },
  moveList: function(position, listId) {
    var currentList = this.lists.findWhere({ id: listId });
    var currentPosition = currentList.get('position');
    if (position === 1) {
      currentList.set('position', position - 1);
    } else if (position < currentPosition) {
      currentList.set('position', position - .5);
    } else {
      currentList.set('position', position + 1);
    }
    this.lists.sort();
    this.setListPositions();

    $.ajax({
      url: '/updatelist',
      type: 'POST',
      data: {
        content: JSON.stringify(this.lists.toJSON()),
      },
      success: function() {
        App.renderListView();
        App.renderCardsView();
        if (currentList.get('subscribed')) {
          App.notifications.unshift({
            cardId: null,
            detail: 'Timmy L. moved list: ' + currentList.get('name') + ' ' + App.formatDate(new Date()),
          })

          App.saveNotifications();
          App.ringBell();
        }
      }
    })
  },
  copyList: function(newListName, listId) {
    var currentList = this.lists.findWhere({ id: listId });
    var cardsInCurrentList = this.cards.where({ listId: listId });
    var clonedCards = []
    var clonedList = currentList.clone();
    clonedList.set('name', newListName);

    cardsInCurrentList.forEach(function(card) {
      clonedCards.push(card.clone());
    })

    $.ajax({
      url: 'copylist',
      type: 'POST',
      data: {
        list: JSON.stringify(clonedList),
        cards: JSON.stringify(clonedCards),
      },
      success: function(data) {
        App.lists.add(data[0]);
        App.lists.sort();
        App.setListPositions();

        data[1].forEach(function(card) {
          App.cards.add(card);
        });

        App.refreshAppDataOnListChange();

        App.renderListView();
        App.renderCardsView();
      }
    });
  },
  closeModal: function(e) {
    e.stopPropagation();
    if (this.currentCard.view) {
      if ($('#label_popup:visible').length > 0 || $('#date_popup:visible').length > 0 || $('#move_card_popup:visible').length > 0 || $('#copy_card_popup:visible').length > 0) {
        this.currentCard.view.closeAllPopups();
      } else {
        this.currentCard.view.remove();
      }
    }

    if (this.currentCard.quickEditView) {
      if ($('#label_popup:visible').length > 0 || $('#date_popup:visible').length > 0 || $('#move_card_popup:visible').length > 0 || $('#copy_card_popup:visible').length > 0) {
        this.currentCard.quickEditView.closeAllPopups();
      } else {
        this.currentCard.quickEditView.remove();
      }
    }
  },
  searchCards: function(e) {
    var query = $('#search input').val();
    var regexp = new RegExp(query, 'ig');
    var matchingCards = this.cards.models.filter(function(model) { 
      return model.get('name').match(regexp); 
    });

    if (!query) {
      matchingCards = []
    }

    $('#search_results').show();

    if (this.searchResultsView) {
      this.searchResultsView.remove();
    }

    this.searchResultsView = new SearchResultsView({ collection: matchingCards });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    $('img.bell').on('click', this.showNotifications.bind(this));
    $('main').on('click', 'li.show_add_list_form', this.showAddListForm);
    $('main').on('submit', 'form.new_list', this.addNewList);
    $('#overlay').on('click', this.closeModal.bind(this));
    $('#search input').on('keyup', this.searchCards.bind(this));
    this.on('new_card', this.addCard);
    this.on('list_name_change', this.editListName);
    this.on('viewCardDetails', this.createCardDetailView);
    this.on('toggleSubscription', this.toggleSubscription);
    this.on('postComment', this.postComment);
    this.on('updateCardDescription', this.updateCardDescription);
    this.on('updateLabel', this.updateLabel);
    this.on('editCardName', this.editCardName);
    this.on('setDueDate', this.setDueDate);
    this.on('archiveCard', this.archiveCard);
    this.on('toggleListSubscription', this.toggleListSubscription);
    this.on('archiveAllCards', this.archiveAllCards);
    this.on('archiveList', this.archiveList);
    this.on('moveCards', this.moveCards);
    this.on('openQuickEdit', this.createQuickEditView);
    this.on('moveCard', this.moveSingleCard);
    this.on('copyCard', this.copyCard);
    this.on('moveList', this.moveList);
    this.on('copyList', this.copyList);
    // this.listenTo(this.lists, 'change', this.updateJSON)
  },
  init: function() {
    this.getAllListIds();
    this.getAllListNames();
    this.setCardPositions();
    this.setCardsCountInList();
    this.renderListView();
    this.renderCardsView();
    this.bindEvents();
  },
};

// Close any open windows
$(document).on('click', function(e) {
  if($('#list_action_popup')) {
    $('#list_action_popup').hide();
  }

  if ($('#search_results')) {
    $('#search_results').hide();
  }

  if (App.notifications.view) {
    $('ul.notifications').hide();
  }

  $('#move_list_popup').hide();
  $('#move_all_cards_popup').hide();
  $('#copy_list_popup').hide();

  $('div.add').hide();
  $('div.add_card').show();
});

$(function() {
  $('ul.list').sortable({
    appendTo: 'ul.sort',
    axis: 'x',
    handle: '.heading_wrapper',
    stop: function(e) {
      App.moveListByDrop($(this).children('li.sort'));
    }
  });
});