// =======================================
//              DEPENDENCIES
// =======================================
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport')();
const app = express();
const MONGOURI = process.env.MONGODB_URI
const methodOverride = require('method-override');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');
const userController = require('./controllers/users.js')
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
mongoose.connection.on('error',  (err) => {
    console.log('You\'re disconnected from MongoDB, you should refresh');
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// =======================================
//               MIDDLEWARE 
// =======================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());


// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Connect body parser to app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userController)

//SETUP VIEW ENGINE
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// =======================================
//                 ROUTES 
// =======================================
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.info(`Listening on port ${port}`);
});

process.on('uncaughtException', () => server.close());

module.exports = app;