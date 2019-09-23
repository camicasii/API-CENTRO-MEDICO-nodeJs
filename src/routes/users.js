const router =  require('express').Router(); 
const User = require('../models/User');
const Session = require('../models/Session');
const passport = require('passport');
const jwt =  require('jsonwebtoken');
const {ensureToken} = require('../lib/helpers');
const {isLoggedIn, isNotLoggedIn} =require('../lib/auth');
const {getData, getDatas, postData, putData, deleteData } = require('../controllers/users');


router.get('/',getDatas)

router.get('/:id',getData)

router.put('/:id',putData)

router.delete('/:id',deleteData)


module.exports = router;