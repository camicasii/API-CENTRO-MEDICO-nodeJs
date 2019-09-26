const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {checkToken2,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');


router.post('/signup',signup);


router.post('/signin',signin)
router.post('/signout',checkToken, async(req,res)=>{
    let userjwt = await User.find({_id:req.body.id})
    userjwt.tokenId=null;
    await userjwt.save();
})
router.get('/issignin',checkToken2)


module.exports = router;