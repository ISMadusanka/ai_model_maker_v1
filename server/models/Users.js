const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    projects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Project',
    }
});

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

//fire a function after doc saved to db
userSchema.post('save', function(doc, next) {
    next();
});

//static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

// method to add project ID to projects array
userSchema.methods.addProject = async function(projectId) {
    this.projects.push(projectId);
    await this.save();
    return this;
}


const User = mongoose.model('user', userSchema);

module.exports = User;