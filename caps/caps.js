module.exports = io => {
  const caps = io.of('/caps'); // to create a namespace
  caps.on('connection', socket => {
    // this will be called when a client connect  to the /slick
    console.log('Welcome to the Store');
    let vender = '';
    let driver = '';

    socket.on('join', room => {
      socket.join(room); // this will join a specific room
      console.log(`${room} has joined`);
      if (room === 'vendor') {
        vender = caps.to(`${socket.id}`);
        vender.emit('createPackage');
      }
      //   if (room === 'driver') {
      //     driver = caps.to(`${socket.id}`);
      //     console.log(driver);
      //   }
    });

    socket.on('event', message => {
      driver = caps.to('driver');
      if (message.event === 'newPackage') {
        log(message.event, message.payload);
        driver.emit('pickup', message.payload);
      }
      if (message.event === 'pickup') {
        console.log('hiiiii pick up from event');
        log(message.event, message.payload);
        log('in-transit', message.payload);
        console.log('befooore deliver');
        driver.emit('delivered', message.payload);
      }
      console.log('message.event message.event', message.event);
      if (message.event === 'delivered') {
        console.log('delivereddelivereddelivered');
        log(message.event, message.payload);
        socket.to('vendor').emit('delivered', message.payload.orderID);
      }
    });

    socket.on('message', payload => {
      // this will broadcast to all users in the current room ONLY
      caps.to(currentRoom).emit('message', payload);
    });
  });
};

function log(event, payload) {
  console.log('EVENT', { event, time: new Date(), payload });
}
