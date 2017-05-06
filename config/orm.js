var connection = require('./connection.js');
// mysql connection
connection.connect(function(err) {
  if (err) {
    console.error('error: ' + err.stack);
    return;
  };
  console.log('connected as: ' + connection.threadId);
});
// build ORM methods to query and update the db
var orm = {
  // selectAll()
  selectAll: function(callback) {
    // Run MySQL Query
    connection.query('SELECT * FROM burgers', function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  // insertOne()
  insertOne: function(burger_name, callback){
    // Run MySQL Query
    connection.query('INSERT INTO burgers SET ?', {
      burger_name: burger_name,
      devoured: false
      // date: timestamp
    }, function (err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  // devour a burger, update the database
  updateOne: function(burgerID, callback){
    // Run MySQL Query
    connection.query('UPDATE burgers SET ? WHERE ?', [{devoured: true}, {id: burgerID}], function (err, result) {
        if (err) throw err;
        callback(result);
      });
  }
};
// Export the ORM object in module.exports.
module.exports = orm;