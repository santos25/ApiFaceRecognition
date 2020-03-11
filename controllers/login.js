const bcrypt = require('bcrypt');

const login = (req, res , dbPg) => {
    const { email, password } = req.body;
    dbPg('login').where({
      email: email,
    }).select('password')
      .then(response => {
        if (bcrypt.compareSync(password, response[0].password)) {
          dbPg('users').where({
            email: email,
          }).select('*')
            .then(response => res.json(response[0]));
        } else
          res.status(404).json("No valid Credentials")
      })
      .catch(err => res.status(404).json("No valid Credentials"));
  }

module.exports = {
    login : login
}