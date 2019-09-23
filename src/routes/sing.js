const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')

router.post('/signup',signup)

router.post('/signin',signin)


module.exports = router;