const JWT = require('jsonwebtoken')
const { EXPIRES_IN, SECRET, SECRET_2} = require('./config')

const Token = {
    generateToken: (payload, expiresIn = EXPIRES_IN, secret = SECRET) => {
        console.log('[GENERATE TOKEN]\n\tSecret: '+secret+'\n\tExpires: '+expiresIn)
        const token =JWT.sign(payload, secret, { expiresIn })
        return {
            token
        }
    },
    verifyToken: (request, response, next) => {
        console.log('Verifying user...')
        const token = request.headers['authorization']
        try{
            const { user } = JWT.verify(token, SECRET)
            request.user = user
            next()
        }        
        catch (err) {
            const { user, token, refreshToken} = Token.refreshToken(request, response)    
            request.user = user
            console.log(request.user)
            request.refreshToken = refreshToken
            request.token = token
            next()  
        }
        
    },
    refreshToken: ( request, response ) => {
        console.log('Refreshing token...')
        const tokenRefresh = request.headers['x-refresh-token']
        const user = JWT.verify(tokenRefresh, SECRET_2, (err, data) => {
            if (err) response.status(400).json({message:"Invalid refresh token"})
            return data.username
        })
        const newToken = Token.generateToken({ user })
        const newRefreshToken = Token.generateToken({ user }, '7d', SECRET_2)
        return { user, token: newToken.token, refreshToken: newRefreshToken.token}
    },
    getCredentials: user => {
        const token = Token.generateToken({ user })
        const refreshToken = Token.generateToken({ user }, '7d', SECRET_2)
        return {token: token.token, refreshToken: refreshToken.token}
    }

} 


module.exports = Token
