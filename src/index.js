const express =  require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {cors} = require('./lib/conrConf')
const session = require('express-session')
const passport= require('passport');
const MongoStore = require('connect-mongo')(session);

const app = express();
mongoose.connect('mongodb://localhost/consultorio-medico',{//conectanmos a la db si no existe la creamos
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
app.use(express.json());
app.use(express.raw());
app.use(cors);
app.use(session({
    secret: 'safgsaga24g2sdafg2ag1afg2adf1ga2fg5daf7g',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use( '/api/user', require('./routes/users'));
app.use( '/api/doctors', require('./routes/doctors'));
app.use( '/api/employee', require('./routes/employee'));
app.use( '/api/citas', require('./routes/citas'));
app.use( '/api/patient', require('./routes/patient'));

//global Variables 

app.use((req,res,next)=>{
    app.locals.user = req.user;    
    next();
})



//Static file
app.use('/public',express.static(__dirname +'/public'));

//Server Listening
app.listen(app.get('port'),()=>{
    console.log('Server on port:', app.get('port'));    
})