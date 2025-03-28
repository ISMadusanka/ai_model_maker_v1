const User = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// handle errors
const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = { email: '', password: '' };

    //duplicate error code
    if(error.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    //validation errors
    if(error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//jwt generator
const CreateToken = (id,email)=>{
    return jwt.sign({id, email},process.env.JWT_SECRET,
    {expiresIn: 3*24*60*60}
    );
}

const createAccessToken = (id) => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
}

module.exports.accesstoken_get = (req,res) => {

    const refreshToken = req.cookies.jwt;
    if(refreshToken){
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
            if(err) return res.sendStatus(403).json({ message: 'Unauthorized' });
            const accessToken = createAccessToken(user.id);
            res.json({ accessToken, email: user.email});
        });


    }else{
         res.status(403).json({ message: 'Unauthorized' });
    }

}


module.exports.profile_get = (req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    // res.json({
    //     user: {
    //         id: user.id,
    //         name: user.name,
    //         email: user.email
    //     },
    //     accessToken
    // });
    
    res.json({
        email:res.locals.user.email
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signin_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
   const { email, password } = req.body;

   try {
    
    const user = await User.create({ email, password });
    const token = CreateToken(user._id, user.email);
    res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000});
    res.status(201).json({user: user.email});

   } catch (error) {
        const err= handleErrors(error);
        res.status(400).json({err});
   }
    
   
}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = CreateToken(user._id, user.email);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60*1000});
        res.status(200).json({user: user._id});
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({err});
        console.log(error);
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
    res.status(200).json({ message: 'User logged out' });
};

