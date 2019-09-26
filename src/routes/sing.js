const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {checkToken2,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');

router.post('/signup',signup);


router.post('/signin',signin)
router.delete('/signout',checkToken, async(req,res)=>{
    console.log("paso out");    
    
    const jwUser = await User.findOne({tokenId:req.headers.authorization})
    console.log("busco user");
    console.log(userjwt);        
    if(jwUser!==null||jwUser!==undefined){
        console.log("paso el si");
        
        jwUser.tokenId=null;  
    console.log("paso el si");
    console.log(jwUser);
    //res.status(200)
    await jwUser.save()
    res.status(200)
    }





router.get('/issignin',checkToken2)


module.exports = router;