var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var handleBars = require('express-handlebars');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(methodOverride("_method"));
app.engine("handlebars", handleBars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);
// require("./controllers/burger_controller.js")(app);

app.listen(PORT);
console.log(PORT);
