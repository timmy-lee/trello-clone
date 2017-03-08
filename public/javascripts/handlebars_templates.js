this["JST"] = this["JST"] || {};

this["JST"]["card_details"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<img class=\"subscribed\" src=\"../images/eye-16.png\" />";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"card_labels\"><p>Labels</p>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"label\" style=\"background:"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "</span>";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"due_date\"><p>Due Date</p><p>"
    + container.escapeExpression(((helper = (helper = helpers.due || (depth0 != null ? depth0.due : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"due","hash":{},"data":data}) : helper)))
    + "</p></div>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\">Edit the description</a>";
},"10":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\">Add a description</a>";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>"
    + container.escapeExpression(((helper = (helper = helpers.activity || (depth0 != null ? depth0.activity : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"activity","hash":{},"data":data}) : helper)))
    + "</p>";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<img src=\"../images/emoticon-24.png\" /><h3>"
    + alias4(((helper = (helper = helpers.commenter || (depth0 != null ? depth0.commenter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"commenter","hash":{},"data":data}) : helper)))
    + "</h3><div class=\"comment_body\"><p>"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p></div><div class=\"comment_details\"><span>"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"card_details\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><div id=\"header\"><img src=\"../images/show-property-24.png\" /><textarea rows=\"1\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea> <img class=\"close\" src=\"../images/x-icon.png\" /><p>in list <a href=\"#\">"
    + alias4(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</a> "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><div id=\"main_bar\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div id=\"card_description\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p><form><textarea rows=\"5\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea><input type=\"submit\" value=\"Save\"><img class=\"close\" src=\"../images/x-icon.png\" /></form></div><div id=\"comments\"><img src=\"../images/comments-24.png\" /><h2>Add Comment</h2><form><img src=\"../images/emoticon-24.png\" /><div id=\"comment_box\"><textarea rows=\"1\" placeholder=\"Write a comment...\"></textarea><div id=\"comment_icons\"><ul><li><img src=\"../images/paper-clip-2-16.png\" title=\"Attach a file\"/></li><li><img src=\"../images/at-3-16.png\" title=\"Mention a member\" /></li><li><img src=\"../images/emoticon-30-16.png\" title=\"Add emoji\" /></li><li><img src=\"../images/show-property-24.png\" title=\"Add card\" /></li></ul></div></div><input type=\"submit\" value=\"Send\" /></form></div><div id=\"activity\"><img src=\"../images/activity-feed-24.png\" /><h2>Activity</h2>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.activity : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div><div id=\"posted_comments\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div><div id=\"sidebar\"><h2>Add</h2><ul class=\"add\"><li class=\"labels\"><span>x</span> <a href=\"#\">Labels</a></li><li class=\"due\"><span>x</span> <a href=\"#\">Due Date</a></li></ul><h2>Actions</h2><ul class=\"actions\"><li class=\"move\"><span>>x</span> <a href=\"#\">Move</a></li><li class=\"copy\"><span>x</span> <a href=\"#\">Copy</a></li><li class=\"subscribe\"><span>x</span> <a href=\"#\">Subscribe</a></li><li class=\"archive\"><span>x</span> <a href=\"#\">Archive</a></li></ul></div><div id=\"label_popup\"><p>Labels <img class=\"close\" src=\"../images/x-icon.png\" /></p><input type=\"text\" class=\"label_search\" /><div class=\"label red\"><span style=\"background:red\" data-color=\"red\"></span><img src=\"https://placehold.it/30x30\" /></div><div class=\"label orange\"><span style=\"background:orange\" data-color=\"orange\"></span><img src=\"https://placehold.it/30x30\" /></div><div class=\"label yellow\"><span style=\"background:yellow\" data-color=\"yellow\"></span><img src=\"https://placehold.it/30x30\" /></div><div class=\"label green\"><span style=\"background:green\" data-color=\"green\"></span><img src=\"https://placehold.it/30x30\" /></div><div class=\"label blue\"><span style=\"background:blue\" data-color=\"blue\"></span><img src=\"https://placehold.it/30x30\" /></div><div class=\"label purple\"><span style=\"background:purple\" data-color=\"purple\"></span><img src=\"https://placehold.it/30x30\" /></div></div><div id=\"date_popup\"><p>Change Due Date <img class=\"close\" src=\"../images/x-icon.png\" /></p><h3 id=\"error\">You have selected an invalid day</h3><form><select id=\"month\"><option value=\"Month\" selected=\"selected\" disabled>Month</option><option value=\"Jan\">Jan</option><option value=\"Feb\">Feb</option><option value=\"Mar\">Mar</option><option value=\"Apr\">Apr</option><option value=\"May\">May</option><option value=\"Jun\">Jun</option><option value=\"Jul\">Jul</option><option value=\"Aug\">Aug</option><option value=\"Sep\">Sep</option><option value=\"Oct\">Oct</option><option value=\"Nov\">Nov</option><option value=\"Dec\">Dec</option></select><select id=\"day\"><option value=\"Day\" selected=\"selected\" disabled>Day</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option><option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option><option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">23</option><option value=\"24\">24</option><option value=\"25\">25</option><option value=\"26\">26</option><option value=\"27\">27</option><option value=\"28\">28</option><option value=\"29\">29</option><option value=\"30\">30</option><option value=\"31\">31</option></select><input type=\"time\" id=\"time\" /><div id=\"buttons\"><input type=\"submit\" value=\"Save\" /><input type=\"button\" value=\"Remove\" /></div></form></div><div id=\"copy_card_popup\"><p>Copy card <img class=\"close\" src=\"../images/x-icon.png\" /></p><div id=\"copy_card_name\"><h4>Title</h4><textarea rows=\"3\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea></div><div class=\"label_for_select\"><span>List</span><select id=\"lists_of_lists_for_copy\"></select></div><div class=\"label_for_select pos\"><span>Position</span><select id=\"card_positions_for_copy\"></select></div><input type=\"button\" value=\"Copy\" /></div></div>";
},"useData":true});

this["JST"]["cards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><img class=\"quickedit\" src=\"../images/pencil-2-16.png\" />"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<a href=\"#\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a><div class=\"quicklook\"><ul class=\"quicklook\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></div></li>";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mini_labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"label\" style=\"background:"
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + "\"></span> ";
},"5":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due_date\" title=\"You are subscribed\"><img src=\"../images/eye-16.png\" /></li>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due_date\" title=\"This card has a due date\"><img src=\"../images/clock-16.png\" /></li>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<li class=\"description\" title=\"This card has a description.\"><img src=\"../images/list-view-16.png\" /></li>";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"comments\" title=\"Comments\"><img src=\"../images/speech-bubble-16.png\"/><span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.card : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["lists"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"list sort\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "><div class=\"heading_wrapper\"><p data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p><input class=\"edit_name_field\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" /><div class=\"list_icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<span>&#183;&#183;&#183;</span></div></div><ul class=\"card\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></ul><div class=\"add_card\">Add a card...</div><div class=\"add\"><form class=\"add_card\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><fieldset><textarea class=\"add_card\" rows=\"3\"></textarea><input type=\"submit\" value=\"Add\" /><img class=\"close\" src=\"../images/x-icon.png\" /></fieldset></form></div></li>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<img src=\"../images/eye-16.png\" />";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<li class=\"list show_add_list_form\">Add a list...</li><li class=\"form\"><form action=\"/\" class=\"new_list\"><fieldset><input id=\"add_list_form\" type=\"text\" placeholder=\"Add a list...\" /><input type=\"submit\" value=\"Add\" /></fieldset></form></li><div id=\"list_action_popup\"><p> List Actions <img class=\"close\" src=\"../images/x-icon.png\" /></p><ul class=\"list_actions\"><li class=\"add_card\">Add Card...</li><li class=\"copy_list\">Copy List...</li><li class=\"move_list\">Move List...</li><li class=\"subscribe\">Subscribe...</li></ul><ul class=\"card_actions\"><li class=\"move_cards_from_list\">Move all cards in this list...</li><li class=\"archive_cards_from_list\">Archive all cards in this list...</li></ul><ul><li class=\"archive_list\">Archive this list</li></ul></div><div id=\"move_all_cards_popup\"><p> Move All Cards in List<img class=\"close\" src=\"../images/x-icon.png\" /></p><ul class=\"list_of_lists\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></div><div id=\"move_list_popup\"><p>Move List <img class=\"close\" src=\"../images/x-icon.png\" /></p><div class=\"label_for_select\"><span>Position</span><select id=\"list_positions\"></select></div><input type=\"button\" value=\"Move\" /></div><div id=\"copy_list_popup\"><p>Copy List <img class=\"close\" src=\"../images/x-icon.png\" /></p><form><fieldset><h4>Name</h4><textarea rows=\"3\"></textarea><input type=\"submit\" value=\"Create List\" /></fieldset></form></div>";
},"useData":true});

this["JST"]["move_card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"move_card_popup\"><p>Move Card <img class=\"close\" src=\"../images/x-icon.png\" /></p><div class=\"label_for_select \"><span>List</span><select id=\"lists_of_lists\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listProp : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"label_for_select pos\"><span>Position</span><select id=\"card_positions\"></select></div><input type=\"button\" value=\"Move\" /></div>";
},"useData":true});

this["JST"]["notifications"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-id=\""
    + alias4(((helper = (helper = helpers.cardId || (depth0 != null ? depth0.cardId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardId","hash":{},"data":data}) : helper)))
    + "\"><a>"
    + alias4(((helper = (helper = helpers.detail || (depth0 != null ? depth0.detail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"detail","hash":{},"data":data}) : helper)))
    + "</a></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>Notifications</p>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.notifications : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["quickedit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mini_labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"label\" style=\"background:"
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + "\"></span> ";
},"4":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due_date\" title=\"You are subscribed\"><img src=\"../images/eye-16.png\" /></li>";
},"6":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due_date\" title=\"This card has a due date\"><img src=\"../images/clock-16.png\" /></li>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<li class=\"description\" title=\"This card has a description.\"><img src=\"../images/list-view-16.png\" /></li>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"comments\" title=\"Comments\"><img src=\"../images/speech-bubble-16.png\"/><span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"quickedit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><div id=\"with_button\"><div id=\"card_info\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<textarea rows=\"3\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"quicklook\"><ul class=\"quicklook\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></div></div><input type=\"button\" value=\"Save\" /></div><div id=\"quickedit_actions\"><ul><li class=\"edit_labels\"><img src=\"../images/edit-white-16.png\" /><span>Edit Labels</span></li><li class=\"move\"><img src=\"../images/arrow-right-white.png\" /><span>Move</span></li><li class=\"copy\"><img src=\"../images/copy-white-16.png\" /><span>Copy</span></li><li class=\"due\"><img src=\"../images/time-8-16.png\" /><span>Change Due Date</span></li><li class=\"archive\"><img src=\"../images/filled-box-white-16.png\" /><span>Archive</span></li></ul></div><div id=\"label_popup\"><p>Labels <img class=\"close\" src=\"../images/x-icon.png\" /></p><div class=\"label red\"><span style=\"background:red\" data-color=\"red\"></span></div><div class=\"label orange\"><span style=\"background:orange\" data-color=\"orange\"></span></div><div class=\"label yellow\"><span style=\"background:yellow\" data-color=\"yellow\"></span></div><div class=\"label green\"><span style=\"background:green\" data-color=\"green\"></span></div><div class=\"label blue\"><span style=\"background:blue\" data-color=\"blue\"></span></div><div class=\"label purple\"><span style=\"background:purple\" data-color=\"purple\"></span></div></div><div id=\"date_popup\"><p>Change Due Date <img class=\"close\" src=\"../images/x-icon.png\" /></p><h3 id=\"error\">You have selected an invalid day</h3><form><select id=\"month\"><option value=\"Month\" selected=\"selected\" disabled>Month</option><option value=\"Jan\">Jan</option><option value=\"Feb\">Feb</option><option value=\"Mar\">Mar</option><option value=\"Apr\">Apr</option><option value=\"May\">May</option><option value=\"Jun\">Jun</option><option value=\"Jul\">Jul</option><option value=\"Aug\">Aug</option><option value=\"Sep\">Sep</option><option value=\"Oct\">Oct</option><option value=\"Nov\">Nov</option><option value=\"Dec\">Dec</option></select><select id=\"day\"><option value=\"Day\" selected=\"selected\" disabled>Day</option><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option><option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option><option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option><option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">23</option><option value=\"24\">24</option><option value=\"25\">25</option><option value=\"26\">26</option><option value=\"27\">27</option><option value=\"28\">28</option><option value=\"29\">29</option><option value=\"30\">30</option><option value=\"31\">31</option></select><input type=\"time\" id=\"time\" /><div id=\"buttons\"><input type=\"submit\" value=\"Save\" /><input type=\"button\" value=\"Remove\" /></div></form></div><div id=\"move_card_popup\"><p>Move Card <img class=\"close\" src=\"../images/x-icon.png\" /></p><div class=\"label_for_select \"><span>List</span><select id=\"lists_of_lists\"></select></div><div class=\"label_for_select pos\"><span>Position</span><select id=\"card_positions\"></select></div><input type=\"button\" value=\"Move\" /></div><div id=\"copy_card_popup\"><p>Copy card <img class=\"close\" src=\"../images/x-icon.png\" /></p><div id=\"copy_card_name\"><h4>Title</h4><textarea rows=\"3\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea></div><div class=\"label_for_select\"><span>List</span><select id=\"lists_of_lists_for_copy\"></select></div><div class=\"label_for_select pos\"><span>Position</span><select id=\"card_positions_for_copy\"></select></div><input type=\"button\" value=\"Copy\" /></div></div>";
},"useData":true});

this["JST"]["search"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"search_results\"><p>Search Results</p><ul>"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.card : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></div>";
},"useData":true});