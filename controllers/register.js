const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req, res,  dbPg)  =>  {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
  
    // Using trx as a transaction object:
    dbPg.transaction(function (trx) {
      dbPg.insert({ email: email, password: hash }, 'email')
        .into('login')
        .transacting(trx)
        .then(function (email) {
          return dbPg('users')
            .returning('*')
            .insert({ username: name, email: email[0], joined: new Date() })
            .transacting(trx)
            .then((data) => {
              console.log(data);
              res.json(data[0])
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then(function (insert) {
        console.log(insert + ' new user saved.');
      })
      .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        res.status(404).json("error by inserting user");
      });
  }

module.exports = {
    register : register
}