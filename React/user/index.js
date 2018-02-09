// module.exports = exports = this
var db = require('../db');
db.connect();

function User(name) {
    this.name = name;
}

User.prototype.hello = function(who) {
    console.log(db.getPhrase("1960") + ", " + who.name);
};


module.exports = User;


