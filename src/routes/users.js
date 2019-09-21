const router =  require('express').Router(); 
const User = require('../models/User');
const passport = require('passport');
const jwt =  require('jsonwebtoken');
const {ensureToken} = require('../lib/helpers');
const {isLoggedIn, isNotLoggedIn} =require('../lib/auth');
const {getData, getDatas, postData, putData, deleteData } = require('../controllers/users');

router.get('/',getDatas)
router.get('/signin',(req,res)=>{
    res.json({state:'/signin'})
})
router.get('/signup',(req,res)=>{
    res.json({state:'/signup'})
})
router.get('/profile',(req,res)=>{
    res.json({state:'/profile'})
})

router.post('/login',(req,res)=>{
    console.log("login");    
    const user = req.body;
    const token = jwt.sign(
        {user},
        "asdfasdfasdfasdfasdfasdf",
        { expiresIn: '1h' });    
    res.json({token})    
})

router.get('/ptc',ensureToken,(req,res)=>{
    console.log("ptc");    
    jwt.verify(req.token,"asdfasdfasdfasdfasdfasdf",(e,data)=>{        
        if(e){ res.status(403).json({error:"error"})
            console.log("paso verificacion");}
        else{
            res.json({
                text:"protected",
                data
            })
        }
    })
})
router.get('/:id',getData)

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup',{
    successRedirect:'/api/user/profile',
    failureRedirect:'/api/user/signup',
    failureFlash:true
}))

router.post('/signin',isNotLoggedIn,passport.authenticate('local.signin',{
    successRedirect:'/api/user/profile',
    failureRedirect:'/api/user/signin',
    failureFlash:true,
}))

router.put('/:id',putData)

router.delete('/:id',deleteData)


module.exports = router;