const JWT = require('jsonwebtoken')
const { EXPIRES_IN } = require('./config')

const Token = {
    generateToken: payload => {
        const token =JWT.sign(payload, 'banana', { expiresIn: EXPIRES_IN })
        return {
            status: 201,
            token
        }
    },
    verifyToken: (request, response, next) => {
        console.log('Verifying user...')
        const token = request.headers['authorization']
        const { user } = JWT.verify(token, 'banana', (err, token) => {
            if (err) response.status(400).json({message:"Invalid token"})
            return token
        })
        if(!user) return response.status(403).json({message: "Permission denied"})
        request.user = user
        next()
    },
    refreshToken: ( request, response ) => {
        console.log('Refreshing token...')
        const token = request.headers['authorization']
        const { user } = JWT.verify(token, 'banana', (err, token) => {
            if (err) response.status(400).json({message:"Invalid token"})
            return token
        })
        return response.json(Token.generateToken({ user }))
    }

} 


module.exports = Token
