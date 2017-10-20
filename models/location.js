const errorMessageHandler = require('../messages/handler/errorMessageHandler');
const query = require('../db/pool').query;

module.exports = {
  all: async () => {
    const locations = (await query('SELECT id, name FROM "locations"')).rows;
    return locations;
  },

  create: async properties => {
    const location = (await query(
      'insert into "locations" ("name") values ($1) returning *',
      [properties.name]
    )).rows[0];

    return location;
  },

  find: async id => {
    const location = (await query(
      'select * from "locations" WHERE ("id") = ($1) LIMIT 1',
      [id]
    )).rows[0];
    return location;
  },
};
