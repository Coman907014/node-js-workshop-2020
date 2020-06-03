
const mongoose = require('mongoose');

module.exports = callback => {
    const connectionURL = process.env.CONNECTION_DB;
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    mongoose.connection.once('open', () => callback())
};
