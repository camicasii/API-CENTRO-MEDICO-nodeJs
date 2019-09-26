const passport = require('passport');
const  {sendToken,checkToken} =  require('../lib/tokenController');

module.exports={
    signup:[passport.authenticate('local.signup',
    {  session: false }),sendToken],
    signin:[passport.authenticate('local.signin',
    {session: false}),sendToken]    
}