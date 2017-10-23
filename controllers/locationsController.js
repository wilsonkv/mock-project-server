const Location = require('../models/location');
const errorMessageHandler = require('../messages/handler/errorMessageHandler');

exports.index = async (req, res, next) => {
    try {
        const locations = await Location.all();
        res.json(locations);
    } catch (err) {
        console.log(err);
        res.json(errorMessageHandler.getError(1001));
    }
};