function mysqlQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  mysqlQuery
};
