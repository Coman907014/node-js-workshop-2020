
const mongoose = require('mongoose');

module.exports = callback => {
    const connectionURL = 'mongodb+srv://Coman907014:<password>@real-estate-db-bwtze.mongodb.net/test?retryWrites=true&w=majority';
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    mongoose.connection.once('open', () => callback())
};
