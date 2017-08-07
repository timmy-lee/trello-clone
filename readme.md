Hello and welcome to a project that I have built as a personal journal entry of what I can achieve at this point in time since I started learning software and web development 8 months ago. [Check out the live version here!](https://trello-board-clone-timlee92.herokuapp.com/)

This is my attempt at the recreation of a single board, from scratch, of the single page application Trello using HTML, CSS, JavaScript, jQuery, Backbone, and Handlebars, with ExpressJS to handle the simple back-end.

## Main Points and Features
* Single page application
* Persistence via reading and writing to JSON file
* Create lists
* Delete lists ("archiving")
  * As well as all cards in the list
  * Can delete all cards in a list without deleting the list itself
* Edit list name
* Make a copy of a list
  * Along with copies of all cards in the list
* In-app notifications
* Subscribe to a list
  * Creates in-app notifications when something changes to a subscribed list
* Move the list around to sort
* Create cards
* Delete cards
* Edit cards
  * Add, edit, and remove labels
  * Add, edit, and remove due-dates
  * Add, edit, and remove descriptions
  * Add comments
  * Toggle subscription
  * Move to different list
  * "Quick editing" with a preview modal or "slow editing" with larger modal
* Copy cards
  * To the same list or different list
  * All attributes of the card are copied over
* Card activities are logged with timestamps
