const User = require('../models/User');
const checkCredentials = require('../scraper/login');

const register = async(req, res) => {
    // const user = req.body
    // const isValid = await checkCredentials(user.email, user.password).then(response => response)
    // if (!isValid) {

    // }
    res.send('Register user')
}

module.exports = register