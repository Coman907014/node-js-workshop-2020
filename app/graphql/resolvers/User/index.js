const database = require('../../../helpers/database');

module.exports = {
  Query: {
    user: async (parent, { _id }) => {
      const query = `SELECT * from users WHERE id='${_id}'`;

      let users;

      try {
        users = await database.mysqlQuery(query);
      } catch (e) {
        throw new Error(e);
      }

      if (!users.length) {
        throw new Error(JSON.stringify({message: 'User not found!', status: 404 }));
      }

      const user = users[0];

      return {
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      };
    },
    users: async () => {
      const query = `SELECT * from users`;

      let results = [];
      try {
        results = await database.mysqlQuery(query);
      } catch (e) {
        throw new Error(e);
      }

      return results.map(user => ({
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }));
    }
  }
};
