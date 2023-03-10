const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3
    },
    contactNumber: {
        type: String,
        required: [true, 'Please provide contact number'],
        match: [
            /^[6-9]\d{9}$/,
            'Please provide a valid contact number'
        ],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 5
    }
})

// UserSchema.pre('save', async function() {
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//   })
UserSchema.pre('save', async function() {
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.ENCRYPT_KEY, process.env.IV);
    this.password = cipher.update(this.password, 'utf8', 'hex');
    this.password += cipher.final('hex');  
})
  

module.exports = mongoose.model('User', UserSchema)