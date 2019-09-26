const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {checkToken2,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');


router.post('/signup',signup);


router.post('/signin',signin)
router.get('/signout',checkToken, async(req,res)=>{
    console.log("paso out");
    
    let userjwt = await User.find({_id:req.body.id})
    userjwt.tokenId=null;
    await userjwt.save().then(()=>{
        res.status(200)
    }).catch(()=>res.status(401))
})
router.get('/issignin',checkToken2)


module.exports = router;