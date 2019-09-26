const User  =  require('../models/User');
const vali = require('validator');
const jwt = require('jsonwebtoken');
module.exports={ 
  checkToken2:(req,res,next)=>{       
    try{
      jwt.verify(req.headers.authorization, process.env.SECRET)
      res.status(200).json({error:"jwt active"})    
      next();
      }
      catch(err){
        res.status(401).json({error:"jwt false"})
        next();
      }
  },
  checkToken:(req,res,next)=>{       
    try{
    jwt.verify(req.headers.authorization, process.env.SECRET)    
    next();
    }
    catch(err){
      res.status(401).json({error:"jwt false"})
      next();
    }
  },
  sendToken:async(req,res)=>{  
    const userjwt = await User.findOne({username:req.body.username})
    .catch((e)=>res.json({error:e}))          
    userjwt.password= "null";
      if(userjwt){
        jwt.sign(userjwt.toJSON(), process.env.SECRET, { expiresIn: 31556926 }, (err, token) => {
          userjwt.tokenId= token.split(" ")[1]
          await userjwt.save()
          res.status(200).json({
            success: true,
            token: "Bearer " + token
          });
        })     
      }
     else{ 
       res.status(401).json({
         success: false, error: 401
        })
      }
    }

}