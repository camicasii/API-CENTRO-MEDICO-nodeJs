const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User  =  require('../models/User');
const helpers =  require('./helpers');


//congifurar signIn
passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField: 'password', 
    passReqToCallback:true
} ,async(req,username,password,done)=>{        
    console.log("IN");
    console.log(username,password);
    
//    const rows = await User.findOne({username:username})
    const rows = await User.find({username:username});
    console.log(rows.length);
    
    
    if(rows.length>0){
        const user = rows;
        const validatePassword = await helpers.matchPassword(password, user.password);
        console.log("paso");
        if(validatePassword)
        {
            console.log(user);            
                done(null,user);
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
    const data = req.body    
    console.log(username,password );
    const newUser = new User(data)
    newUser.password = await helpers.encryptPassword(password)
    const check = await User.findOne({username:username})
    console.log(check);
    
    if(!check){    
    await newUser.save()
    return done(null,newUser);
    }
    else{
        
        return done(null,false);
        
    }
    } ))


passport.serializeUser((user,done)=>{
    done(null,user._id);
})

passport.deserializeUser( async ( id, done ) => {    
  const rows = await User.findById(id)  
  return done(null,rows);
})

