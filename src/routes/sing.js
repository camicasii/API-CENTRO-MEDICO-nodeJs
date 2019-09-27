const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {checkToken2,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');

router.post('/signup',signup);


router.post('/signin',signin)
router.get('/signout',checkToken, async(req,res)=>{
    console.log("paso out");        
    const jwUser = await  User.find({tokenId:req.headers.authorization})
    
    
        console.log("busco user");    
        if(jwUser!==null&&jwUser!==undefined){
            console.log("paso el si");        
            jwUser.tokenId=null;  
            await  User.findByIdAndUpdate(jwUser._id,jwUser)
          return  res.status(200).json({status:"out"})
            
        }else res.status(401).json({status:"ou fail"})
    

    
})




router.get('/issignin',checkToken2)


module.exports = router;