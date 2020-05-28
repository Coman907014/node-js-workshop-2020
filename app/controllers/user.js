const database = require('../helpers/database');
const { ServerError } = require('../helpers/server-error');

const createOne = async (req, res) => {
  const { name, email, password } = req.body;
  const query = `INSERT INTO users (\`name\`, \`email\`, \`password\`) values ('${name}', '${email}', '${password}')`;

  try {
    return await database.mysqlQuery(query);
  } catch (e) {
    throw new ServerError(e);
  }
};

const getAll = async (req, res) => {
  const query = `SELECT * from users`;

  try {
    return await database.mysqlQuery(query);
  } catch (e) {
    throw new ServerError(e);
  }
};

const getByEmail = async (req, res) => {
  const { email } = req.params;
  const query = `SELECT * from users WHERE email='${email}'`;

  let result;

  try {
    result = await database.mysqlQuery(query);
  } catch (e) {
    throw new ServerError(e);
  }

  if (!result.length) {
    throw new ServerError('User not found!', 404);
  }

  return result;
};

const deleteByEmail = async (req, res) => {
  const { email } = req.params;
  const query = `DELETE from users WHERE email='${email}'`;

  let result;

  try {
    result = await database.mysqlQuery(query);
  } catch (e) {
    throw new ServerError(e);
  }

  if (result.affectedRows === 0) {
    throw new ServerError('User not found!', 404);
  }

  return result;
};

const updateById = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = req.params;
  const query = `UPDATE users SET name='${name}', email='${email}', password='${password}' WHERE id='${id}'`;

  let result;

  try {
    result = await database.mysqlQuery(query);
  } catch (e) {
    throw new ServerError(e);
  }

  if (result.affectedRows === 0) {
    throw new ServerError('User not found!', 404);
  }

  return result;
};

module.exports= {
  createOne,
  getAll,
  getByEmail,
  deleteByEmail,
  updateById,
};
