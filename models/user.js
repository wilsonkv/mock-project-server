'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const query = require('../db/pool').query;
const serializeUser = require('../serializers/user');

module.exports = {
  all: async () => {
    const users = (await query(`SELECT 
                                  USR."id","firstName","lastName","nickName","email","locationId",
                                  "manager","role","imageUrl","aboutMe","isAdmin", LOC."name" AS location
                                FROM "users" USR join "locations" LOC on USR."locationId" = LOC."id"
                                WHERE "isActive" = true`)).rows;
    return users;
  },

  authenticate: async credentials => {
    const user = (await query(`SELECT * 
                                  FROM "users" 
                                WHERE "email" = ($1) and "isActive" = true`, [
      credentials.email,
    ])).rows[0];

    const valid = user
      ? await bcrypt.compare(credentials.password, user.passwordDigest)
      : false;
    if (valid) {
      const serializedUser = await serializeUser(user);
      const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
      return Promise.resolve({
        jwt: token,
        user: serializedUser,
      });
    } else {
      return Promise.resolve({ error: 'Email or Password is incorrect' });
    }
  },

  create: async properties => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(properties.password, salt);

    const user = (await query('select * from "users" where "email" = ($1)', [
      properties.email,
    ])).rows[0];

    if (user) {
      return Promise.resolve({ error: 'Email has already been taken' });
    } else {
      const userResponse = (await query(
        'insert into "users"("firstName", "lastName", "locationId", "email", "passwordDigest", "isAdmin", "isActive") values ($1, $2, $3, $4, $5, $6, $7) returning *',
        [
          properties.firstName,
          properties.lastName,
          properties.locationId,
          properties.email,
          hash,
          properties.isAdmin,
          properties.isActive
        ]
      )).rows[0];
      return userResponse;
    }
  },

  find: async id => {
    const user = (await query(
      'select * from "users" WHERE ("id") = ($1) LIMIT 1',
      [id]
    )).rows[0];
    return user;
  },
};
