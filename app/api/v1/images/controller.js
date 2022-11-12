const { StatusCodes } = require('http-status-codes');
const { createImages } = require('../../../services/mongoose/images')

const create = async (req, res, next) => {
    try {
        console.log('req.file')
        console.log(req.file)
        const result = await createImages(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create
}