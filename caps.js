mainEvent = require('./events');
require('dotenv').config();
const vendor = require('./vendor');

mainEvent.on('createPackage', payload => log('create package', payload));

mainEvent.on('pickUp', payload => {
  setTimeout(() => {
    log('in-transit', payload);
  }, 1000);
});

mainEvent.on('delivered', payload => {
  log('delivered', payload);
});

function log(event, payload) {
  console.log('EVENT', { event, time: new Date(), payload });
}
