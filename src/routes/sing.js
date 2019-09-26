const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {sendToken,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');


router.post('/signup',signup);


router.post('/signin',signin)
router.post('/signout',async (req,res)=>{
    const userjwt = await User.findOne({username:req.body.username})
    userjwt.tokenId=null;
    await userjwt.save();
})
router.get('/issignin',checkToken2)


module.exports = router;