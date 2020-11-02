const mainEvent = require('events');
// this will export one instance of the mainEvent and will make all events work across files
module.exports = new mainEvent();
