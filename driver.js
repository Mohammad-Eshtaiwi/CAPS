mainEvent = require('./events');
function pickUp(payload) {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  mainEvent.emit('pickUp', payload);
  delivered(payload);
}
function delivered(payload) {
  setTimeout(() => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    mainEvent.emit('delivered', payload);
  }, 3000);
}
module.exports = { pickUp, delivered };
