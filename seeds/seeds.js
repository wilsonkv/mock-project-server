if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const clearDB = require('../lib/clearDB');

const Location = require('../models/location');
const User = require('../models/user');

clearDB().then(async () => {
  const location = await Location.create({ name: 'Cochin' });

  const user = await User.create({
    firstName: 'Tom',
    lastName: 'Jerry',
    companyId: location.id,
    email: 'tom@example.com',
    password: 'password',
    isAdmin: true,
    isActive: true
  });

  user.location = location;

  await process.exit();
});
