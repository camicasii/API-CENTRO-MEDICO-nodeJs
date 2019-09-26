const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User  =  require('../models/User');
const helpers =  require('./helpers');

//congifurar signIn
passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password', 
    passReqToCallback:true
},async(req,username,password,done)=>{          
      
    const rows = await User.find({username:username});        
    if(rows.length>0){        
        const user = rows[0];    
        const validatePassword = await helpers.matchPassword(password, user.password);        
        if(validatePassword){          
            user.password = null
            done(null,user)
        }
        else{            
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
})    
) 

//configuracion signUp
passport.use('local.signup', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password', 
    passReqToCallback:true
} ,
async(req,username,password,done)=>{
    console.log("passpor");
    const data = req.body            
    const newUser = new User(data)    
    newUser.password = await helpers.encryptPassword(password)
    const check = await User.find({username:username})
    if(!check[0]){    
    await newUser.save()   
    delete newUser.password;
    return done(null,newUser);
    }
    else{    
        console.log("error");
            
        return done(null,false);        
    }
    } ))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser( async ( _id, done ) => {    
  const rows = await User.findById(_id)  
  return done(null,rows);
})



