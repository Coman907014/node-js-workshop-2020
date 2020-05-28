
const mongoose = require('mongoose');

module.exports = callback => {
    const connectionURL = 'mongodb://task-api-database:27017/task-API';
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    mongoose.connection.once('open', () => callback())
};
