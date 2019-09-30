if(process.env.NODE_ENV === 'production'){ 
require('dotenv').config();
}
const express =  require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {cors} = require('./lib/conrConf')
const session = require('express-session')
const passport= require('passport');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require("body-parser");
//const cookieSession = require('cookie-session');
//const cors =  require('cors');

const app = express();
console.log(process.env.DB_HOST_MONGO_ATLAS);

mongoose.connect(process.env.DB_HOST_MONGO_ATLAS,{//conectanmos a la db si no existe la creamos
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db=>console.log('db is connected'))
    .catch(e=>console.error(e));
require('./lib/passport');



//Settings
app.set('port', process.env.PORT||4000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);//

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path:"/",
         secure: true,
        expire:3600  },       
    store: new MongoStore({ mongooseConnection: mongoose.connection,
        autoRemove : ' intervalo ' , 
        autoRemoveInterval : 1,
         })
  }));  
//app.use(cookieSession({name:'session', keys:"[fsadfsadfsadfasdf]",maxAge:24*60*60*100}))
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');
//Router
app.use( '/api/user', require('./routes/users'));
app.use( '/api/doctors', require('./routes/doctors'));
app.use( '/api/employee', require('./routes/employee'));
app.use( '/api/citas', require('./routes/citas'));
app.use( '/api/patient', require('./routes/patient'));
app.use( '/api/', require('./routes/sing'));

//Static file
app.use('/public',express.static(__dirname +'/public'));

//Server Listening
app.listen(app.get('port'),()=>{
    console.log('Server on port:', app.get('port'));    
})