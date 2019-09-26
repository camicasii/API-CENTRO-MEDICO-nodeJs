const User  =  require('../models/User');
const vali = require('validator');
const jwt = require('jsonwebtoken');
module.exports={ 
  checkToken:async(req,res,next)=>{   
    
    try{
    jwt.verify(req.headers.authorization, process.env.SECRET)
    res.json(200,{error:"jwt active"})    
    next();
    }
    catch(err){
      res.json(401,{error:"jwt false"})
      next();
    }
  },
  sendToken:async(req,res)=>{  
    const userjwt = await User.findOne({username:req.body.username})
    .catch((e)=>res.json({error:e}))          
    userjwt.password= "null";
      if(userjwt){
        jwt.sign(userjwt.toJSON(),process.env.SECRET,{expiresIn: 31556926},
              (err, token) => {           
                //save token in user
                
                ;                
                res.json(200,{
                  success: true,
                  token: "Bearer " + token
                })
            })     
      }
     else{ 
       res.json(404,{
         success: false, error: 401
        })
      }
    }

}