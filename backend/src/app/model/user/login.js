const driver = require('../../database/connection')
const Token = require('../../middlewares/auth')
const { compare_passwords } = require('../../utils/hash')


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
            return Token.getCredentials(user)
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