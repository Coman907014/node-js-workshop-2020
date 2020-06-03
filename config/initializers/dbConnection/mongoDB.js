
const mongoose = require('mongoose');

module.exports = callback => {
    const connectionURL = process.env.DB_CONNECTION;
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    mongoose.connection.once('open', () => callback())
};
