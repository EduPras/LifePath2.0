const driver = require('../../database/connection')
const Token = require('../../middlewares/auth')
const { hashed } = require('../../utils/hash')

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
                OPTIONAL MATCH (u:User{username: "${username}"})
                RETURN u.username
                `
            )
            if (checkuser.records[0].get(0) !== null) return{
                message: "Username is already being used",
                status: 401
            } 
            else {
                const hashedPassword = await hashed(password)
                await tx.run(`
                CREATE (:User{
                    username:"${username}",
                    password:"${hashedPassword}",
                    email:"${email}",
                    name:"${name}"
                })                
                `)

                return Token.getCredentials(username)
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

