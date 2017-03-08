var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var listFilePath = path.resolve(path.dirname(__dirname), 'data/lists.json');
var cardFilePath = path.resolve(path.dirname(__dirname), 'data/cards.json');
var notificationFilePath = path.resolve(path.dirname(__dirname), 'data/notifications.json');

function nextId() {
  return JSON.parse(fs.readFileSync(listFilePath), 'utf8').lastId + 1;
}

function nextCardId() {
  return JSON.parse(fs.readFileSync(cardFilePath), 'utf8').lastId + 1;
}

function getLists() {
  return JSON.parse(fs.readFileSync(listFilePath), 'utf8').data;
}

function getCards() {
  return JSON.parse(fs.readFileSync(cardFilePath), 'utf8').data;
}

function lastCardId() {
  return JSON.parse(fs.readFileSync(cardFilePath), 'utf8').lastId; 
}

function getNotifications() {
  return JSON.parse(fs.readFileSync(notificationFilePath), 'utf8').data;
}

function replaceCard(newCard) {
  var cardId = newCard.id;
  var cards = getCards();
  var lastId = lastCardId();
  var allId = [];

  cards.forEach(function(card) {
    allId.push(card.id);
  });

  var index = allId.indexOf(cardId);
  cards.splice(index, 1, newCard);

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: lastId,
    data: cards
  }), 'utf8');
}

function replaceList(newList) {
  var listId = newList.id;
  var lists = getLists();
  var lastId = nextId() - 1;
  var allId = [];
  lists.forEach(function(list) {
    allId.push(list.id);
  });

  var index = allId.indexOf(listId);
  lists.splice(index, 1, newList);

  fs.writeFileSync(listFilePath, JSON.stringify({
    lastId: lastId,
    data: lists
  }), 'utf8');
}

router.get('/', function(req, res, next) {
  res.render('index', { 
    lists: getLists(),
    cards: getCards(),
    notifications: getNotifications()
  });
});

// router.get('/details/firstcard', function(req, res, next) {
//   res.render('card', {
//     lists: getLists(),
//     cards: getCards()
//   });
// });

router.post('/newlist', function(request, response) {
  var newList = request.body;
  var lists = getLists();
  console.log('hello');

  newList.id = nextId();
  newList.subscribed = false;
  lists.push(newList);
  fs.writeFileSync(listFilePath, JSON.stringify({ 
    lastId: newList.id,
    data: lists
  }), 'utf8'); 

  response.json(newList);
});

router.post('/newcard', function(req, res) {
  var newCard = req.body;
  var cards = getCards();
  newCard.listId = +newCard.listId;
  newCard.id = nextCardId();
  newCard.listName = req.body.listName;
  newCard.subscribed = false;
  newCard.comments = [];
  newCard.activity = [{'activity': newCard.activity}];
  newCard.description = '';
  newCard.labels = [];

  cards.push(newCard);
  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: newCard.id,
    data: cards
  }), 'utf8');

  res.send(newCard);
});

router.post('/editname', function(req, res) {
  var id = nextId() - 1;

  fs.writeFileSync(listFilePath, JSON.stringify({
    lastId: id,
    data: JSON.parse(req.body.content),
  }), 'utf8');

  res.send('success');
});

router.post('/updatelist', function(req, res) {
  var id = nextId() - 1;

  fs.writeFileSync(listFilePath, JSON.stringify({
    lastId: id,
    data: JSON.parse(req.body.content),
  }), 'utf8');

  res.send('success');
});

router.post('/updatecard', function(req, res) {
  var updatedCard = JSON.parse(req.body.card);
  replaceCard(updatedCard);

  res.send('success');
});

// Old ajax calls used until I realized they are accomplish exact same task.
// router.post('/comment', function(req, res) {
//   var updatedCard = JSON.parse(req.body.card);
//   replaceCard(updatedCard);

//   res.send('success');
// });

// router.post('/updateDescription', function(req, res) {
//   var updatedCard = JSON.parse(req.body.card);
//   replaceCard(updatedCard);

//   res.send('success');
// });

// router.post('/updateLabel', function(req, res) {
//   var updatedCard = JSON.parse(req.body.card);
//   replaceCard(updatedCard);

//   res.send('success');
// });

// router.post('/updateCardName', function(req, res) {
//   var updatedCard = JSON.parse(req.body.card);
//   replaceCard(updatedCard);

//   res.send('success');
// });

// router.post('/setDueDate', function(req, res) {
//   var updatedCard = JSON.parse(req.body.card);
//   replaceCard(updatedCard);

//   res.send('success');
// });

router.post('/archivecard', function(req, res) {
  var cards = JSON.parse(req.body.cards);

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: lastCardId(),
    data: cards
  }), 'utf8');

  res.send('success');
});

router.post('/listsubscription', function(req, res) {
  var updatedList = JSON.parse(req.body.list);
  replaceList(updatedList);

  res.send('success');
});

router.post('/archivelist', function(req, res) {
  var updatedList = JSON.parse(req.body.list);

  fs.writeFileSync(listFilePath, JSON.stringify({
    lastId: nextId() - 1,
    data: updatedList
  }), 'utf8');

  res.send('success');
});

router.post('/movecard', function(req, res) {
  var updatedCards = JSON.parse(req.body.cards);

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: lastCardId(),
    data: updatedCards
  }), 'utf8');

  res.send('success');
});

router.post('/movecards', function(req, res) {
  var updatedCards = JSON.parse(req.body.cards);

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: lastCardId(),
    data: updatedCards
  }), 'utf8');

  res.send('success');
});

router.post('/copycard', function(req, res) {
  var newCard = JSON.parse(req.body.card);
  var cards = getCards();
  newCard.id = nextCardId();
  cards.push(newCard);

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: newCard.id,
    data: cards
  }), 'utf8');

  res.send(newCard);
});

router.post('/notification', function(req, res) {
  var notifications = JSON.parse(req.body.notifications);

  fs.writeFileSync(notificationFilePath, JSON.stringify({
    data: notifications
  }), 'utf8');

  res.send('success');
})


router.post('/copylist', function(req, res) {
  var clonedList = JSON.parse(req.body.list);
  var clonedCards = JSON.parse(req.body.cards);
  var lists = getLists();
  var cards = getCards();
  var lastCardId = nextCardId();
  console.log(clonedCards);

  clonedList.id = nextId();
  clonedList.position = clonedList.position + .5;
  lists.push(clonedList);

  clonedCards.forEach(function(card, index) {
    card.id = lastCardId;
    card.listId = nextId();
    card.listName = clonedList.name;
    cards.push(card);
    lastCardId++;
  });

  fs.writeFileSync(listFilePath, JSON.stringify({ 
    lastId: clonedList.id,
    data: lists
  }), 'utf8');

  fs.writeFileSync(cardFilePath, JSON.stringify({
    lastId: lastCardId,
    data: cards
  }), 'utf8');

  res.send([clonedList, clonedCards]);
});

module.exports = router;
