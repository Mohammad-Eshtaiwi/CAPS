const faker = require('faker');
require('dotenv').config();
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.on('connect', () => {
  caps.emit('join', 'driver');
});
caps.on('pickup', payload => {
  setTimeout(() => {
    const message = {
      event: 'pickup',
      payload,
    };
    console.log(`pickup ${message.payload.orderID}`);
    caps.emit('event', message);
  }, 1500);
});

caps.on('delivered', payload => {
  console.log('hiiiiiiiii delevering');
  setTimeout(() => {
    const message = {
      event: 'delivered',
      payload,
    };
    caps.emit('event', message);
  }, 3000);
});
