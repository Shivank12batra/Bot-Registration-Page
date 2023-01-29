const User = require('../models/User');
const checkCredentials = require('../scraper/login');
const {UnauthenticatedError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');
const sendRegisterMessage = require('../whatsapp-api/message')

const register = async(req, res) => {
    const {name, contactNumber, email, password:userPassword} = req.body;
    if (!name || !contactNumber || !email || !userPassword) {
        throw new BadRequestError('Please provide necessary details!')
    }
    const user = await User.create({...req.body})
    const isValid = await checkCredentials(user.email, userPassword).then(response => response)
    if (!isValid) {
        await User.findOneAndDelete({email : user.email})
        throw new UnauthenticatedError('The email or password provided is incorrect')
    }
    console.log(contactNumber)
    // await sendRegisterMessage(user.contactNumber)
    res.status(StatusCodes.CREATED).json({msg: `You have been subscribed to the attendance chatbot and will be receiving updates on ${user.contactNumber}`})
}

module.exports = register