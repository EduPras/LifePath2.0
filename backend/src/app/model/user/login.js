const driver = require('../../database/connection')
const Token = require('../../middlewares/auth')
const { compare_passwords } = require('../../utils/hash')
const { SECRET_2 } = require('../../middlewares/config')


const login = async (user, password) => {
    const session = driver.session()
    try{
        const result = await session.writeTransaction( tx => 
            tx.run(`
            OPTIONAL MATCH (u:user{username:"${user}"})
            RETURN {encryptedPasswd: u.password}
        ` ))
        const { encryptedPasswd }= result.records[0].get(0)
        if (encryptedPasswd === null ) 
            return { 
                message: "User not found", 
                status: 404
            }
        else if (await compare_passwords(password, encryptedPasswd)){
            const token = Token.generateToken({ user })
            const refreshToken = Token.generateToken({ user }, '7d', SECRET_2)
            return {token: token.token, refreshToken: refreshToken.token}
        }
        else {
            return {
                message: "Wrong password",
                status: 401
            }
        }        
    }catch(error){
        console.log('[MODEL user login]: '+error)
    }finally{
        await session.close()
    }
}

module.exports = login