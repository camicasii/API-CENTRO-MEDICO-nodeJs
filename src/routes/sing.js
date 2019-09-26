const router =  require('express').Router(); 
const {signin,signup}= require('../controllers/sing')
const passport = require('passport');
const  {checkToken2,checkToken} =  require('../lib/tokenController');
const User  =  require('../models/User');

router.post('/signup',signup);


router.post('/signin',signin)
router.delete('/signout',checkToken, async(req,res)=>{
    console.log("paso out");    
    try{    
    const userjwt = await User.findOne({tokenId:req.headers.authorization})
    console.log("busco user");
    console.log(userjwt);        
    if(userjwt!==null||userjwt!==undefined){
        console.log("paso el si");
        
    userjwt.tokenId="";  
    console.log("paso el si");
    console.log(userjwt);
    //res.status(200)
    await userjwt.save().then(()=>{
        res.status(200)
    })
    
    }
}catch{
    res.status(401)}
})




router.get('/issignin',checkToken2)


module.exports = router;