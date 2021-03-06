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
  checkToken3:(req,res,next)=>{       
    try{
    jwt.verify(req.headers.authorization, process.env.SECRET)    
    next();
    }
    catch(err){
      res.status(401).json({error:"jwt false"})
      next();
    }
  },
  checkToken:async(req,res,next)=>{       
    try{
    const check= await User.findOne({tokenId:req.headers.authorization})    
    console.log("my",check);
        
    if(check!==null&&check!==undefined) next();
      else res.status(401).json({error:"jwt false"})
    }
    catch(err){
      res.status(401).json({error:"jwt false"})
      next();
    }
  },
  sendToken:async(req,res)=>{    
    const userjwt = await User.findOne({username:req.body.username}).catch((e)=>console.log("ayudaaaa"))    
    console.log("senToken");
    
      if(userjwt){
        userjwt.password = null;   
        userjwt.tokenId = null;   

                  
        jwt.sign(
          userjwt.toJSON(),
          process.env.SECRET,
          { expiresIn: 31556926 },
          async (err, token) => {
            let userjwt2 = await User.find({ username: req.body.username });
            userjwt2[0].tokenId = token.toString()
            console.log(userjwt2[0].tokenId);
            
            await  User.findByIdAndUpdate(userjwt2[0]._id,userjwt2[0]).then(res=>console.log(res)
            );
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          }
        );     
      }
     else{ 
       res.status(401).json({
         success: false, error: 401
        })
      }
    }

}