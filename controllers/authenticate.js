const User = require('../models/User');
const checkCredentials = require('../scraper/login');
const UnauthenticatedError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async(req, res) => {
    const user = await User.create({...req.body})
    const isValid = await checkCredentials(user.email, user.password).then(response => response)
    if (!isValid) {
        await User.findOne(user)
        throw new UnauthenticatedError('Invalid Credentials!')
    }
    res.status(StatusCodes.CREATED).json({msg: `You have been subscribed to the attendance chatbot and will be receiving updates on ${user.phoneNumber}`})
    res.send('Register user')
}

module.exports = register