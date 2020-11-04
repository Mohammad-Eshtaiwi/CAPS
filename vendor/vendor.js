const faker = require('faker');
require('dotenv').config();
const io = require('socket.io-client');
const caps = io.connect('http://localhost:3000/caps');

caps.on('connect', () => {
  caps.emit('join', 'vendor');
});
caps.on('createPackage', () => {
  setInterval(() => {
    const payload = {
      store: process.env.STORE_NAME,
      orderID: faker.random.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    };
    const message = {
      event: 'newPackage',
      payload,
    };

    caps.emit('event', message);
  }, 5000);
});

caps.on('delivered', orderID => console.log(`Thank you for delivering ${orderID}`));
