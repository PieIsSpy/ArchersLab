const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB();

const store = new MongoDBSession({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24
})

store.on('error', (error) => console.log('Error:', error))
store.on('connected', () => console.log('Store Connected to Mongo'))

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'key that will sign cookie',
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.get('/api/auth/init', (req, res) => {
    console.log("id:", req.sessionID)
    console.log('isAuth:', req.session.isAuth)
    if (req.session.isAuth) {
        console.log('New Session Created')
        return res.status(200).json({
            isAuth: true,
            user: req.session.user
        })
    } else {
        return res.status(200).json({
            isAuth: false
        })
    }
})

app.post('/api/users/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({message: 'Could not log out'})
        }

        res.clearCookie('connect.sid');
        res.status(200).json({message: 'Logged out'})
    })
})

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
