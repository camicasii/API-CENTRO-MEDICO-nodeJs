const router =  require('express').Router(); 
const jwt =  require('jsonwebtoken');
const {ensureToken} = require('../lib/helpers');
router.post('/login',(req,res)=>{
    console.log("login");    
    const user = req.body;
    //res.json(req.user.json())
    const token = jwt.sign(
        {user},
        "asdfasdfasdfasdfasdfasdf",
        { expiresIn: '1h' });    
        jwt.verify()
    res.json({token})    
})

router.get('/ptc',ensureToken,(req,res)=>{
    console.log("ptc");    
    jwt.verify(req.token,"asdfasdfasdfasdfasdfasdf",(e,data)=>{        
        if(e){ res.status(403).json({error:"error"})
            console.log("no paso verificacion");}
        else{
            res.json({
                text:"protected"                
            })
        }
    })
})