if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const clearDB = require('../lib/clearDB');

const Location = require('../models/location');
const User = require('../models/user');

clearDB().then(async () => {
  const location = await Location.create({ name: 'Cochin' });
  await Location.create({ name: 'Chennai' });
  await Location.create({ name: 'Bangalore' });

  await User.create({
    firstName: 'Tom',
    lastName: 'Jerry',
    locationId: location.id,
    email: 'tom@example.com',
    password: 'password',
    isAdmin: true,
    isActive: true
  });

  await User.create({
    firstName: 'Wilson',
    lastName: 'Varghese',
    locationId: location.id,
    email: 'wilson@example.com',
    password: 'password',
    isAdmin: false,
    isActive: true
  });

  await User.create({
    firstName: 'Libin',
    lastName: 'Varghese',
    locationId: location.id,
    email: 'libin@example.com',
    password: 'password',
    isAdmin: false,
    isActive: true
  });

  await process.exit();
});
