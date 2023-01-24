const {StatusCodes} = require('http-status-codes')
const {CustomAPIError} = require('../errors')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later'
    }
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map(item => item.message).join(',')
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.msg = `This ${Object.keys(err.keyValue)} is already registered with us!`
        customError.statusCode = 400
    }
    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware