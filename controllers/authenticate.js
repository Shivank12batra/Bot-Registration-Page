const User = require('../models/User');
const checkCredentials = require('../scraper/login');
const {UnauthenticatedError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async(req, res) => {
    const userPassword = req.body.password;
    const user = await User.create({...req.body})
    console.log(user)
    const isValid = await checkCredentials(user.email, userPassword).then(response => response)
    console.log(isValid)
    if (!isValid) {
        await User.findOneAndDelete({email : user.email})
        throw new UnauthenticatedError('Invalid Credentials!')
    }
    res.status(StatusCodes.CREATED).json({msg: `You have been subscribed to the attendance chatbot and will be receiving updates on ${user.contactNumber}`})
}

module.exports = register