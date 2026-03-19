const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false
}))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    // res.send("hello sessions")
})

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));