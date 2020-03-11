var express = require('express');
var router = express.Router();
const knex = require('knex')
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { handleImage , detectFaceImage } = require('../controllers/image');

const dbPg = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'facerecognition'
  }
});

/* GET home page. */
router.get('/', (req, res, next) => res.send('API FACE RECOGNITION'));
router.post('/register', (req, res) => register(req, res, dbPg));
router.post('/login', (req, res) => login(req, res, dbPg));
router.put('/image', (req, res) => handleImage(req, res, dbPg));
router.post('/imageRecognition', (req, res) => detectFaceImage(req, res));

module.exports = router;
