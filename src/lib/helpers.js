const _ =require('underscore');
const helpers={ }
const bcrypt = require('bcryptjs')

helpers.getFilter=(params,id)=>{
    return  new Promise(function(resolve, reject) {
       const newparam = _.filter(params,cita => cita.toString() !== id)       
       if(newparam) resolve(newparam)
       else reject(null)
   })
   }

helpers.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10); //generamos los hash para dar seguridad a nuestro password
    const hash =  await bcrypt.hash(password,salt);
    return hash;
}

helpers.matchPassword = async(password,savedPassword)=>{//desencyptamos la contraceña
    try{
    return await bcrypt.compare(password,savedPassword);
    }catch(e){
         console.log(e);         
     }     

}
helpers.ensureToken=(req,res,next)=>{
   const bearerHeaders = req.headers['authorization'];
   
   if( typeof bearerHeaders !== 'undefined'){    
       const bearerToken = bearerHeaders;
       req.token = bearerToken;   
       return next();
   }
   else{
       return res.sendStatus(403);
   }
}

module.exports = helpers;
