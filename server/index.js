const express = require('express');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');


const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ['https://ai-model-maker-v1-rztw.vercel.app','http://localhost:3000'], // Replace with your allowed origin
    credentials: true, // Allow credentials (cookies) to be sent
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
app.use(cors(corsOptions));



connectDB();

// routes

// this middleware apply to all get requests and set the user locally if the user is logged in
app.get('*', checkUser);

app.use(authRoutes);
app.use(projectRoutes);




// cookies
app.get('/set-cookies', (req, res) => {
    // res.setHeader('Set-Cookie', 'newUser=true');

    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 10, httpOnly: true });

    res.send('you gotkies!');
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;

    res.json(cookies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT).on('listening', () => {
    console.log('Server is running on port 5000');
});