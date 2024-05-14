const connection = require('../config/db.js');

const getUsers = (req, res) => {
  connection.query('SELECT * FROM login_form', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
};


module.exports = { getUsers };

