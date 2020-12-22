const driver = require('../../database/connection')
const Token = require('../../middlewares/auth')
const { hashed } = require('../../utils/hash')
const { SECRET_2 } = require('../../middlewares/config')

const create = async (
    username,
    password,
    name,
    email ) => {
    const session = driver.session()
    try {
        let result = await session.writeTransaction(async tx => {
            const checkuser = await tx.run(
                `
                OPTIONAL MATCH (u:user{username: "${username}"})
                RETURN u.username
                `
            )
            if (checkuser.records[0].get(0) !== null) return{
                message: "Username already been used",
                status: 401
            } 
            else {
                const hashedPassword = await hashed(password)
                await tx.run(`
                CREATE (:user{
                    username:"${username}",
                    password:"${hashedPassword}",
                    email:"${email}",
                    name:"${name}"
                })                
                `)

                const token = Token.generateToken({ username })
                const refreshToken = Token.generateToken({ username }, '7d', SECRET_2)
                return {token: token.token, refreshToken: refreshToken.token}
            }
        })
        return result
        
    } catch (error) {
        console.log('[MODEL user create]: '+ error)
    }finally{
        await session.close()
    }
}

module.exports = create

