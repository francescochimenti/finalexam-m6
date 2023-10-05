const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('userModel', UserSchema, 'users');