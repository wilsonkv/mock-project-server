const Location = require('../models/location');

module.exports = async user => {
  const location = await Location.find(user.locationId);
  const serialized = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: {
      id: location.id,
      name: location.name,
    },
  };
  return serialized;
};
