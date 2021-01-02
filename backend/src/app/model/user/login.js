const driver = require('../../database/connection')
const Token = require('../../middlewares/auth')
const { compare_passwords } = require('../../utils/hash')


const login = async (username, password) => {
    const session = driver.session()
    try{
        const result = await session.writeTransaction( tx => 
            tx.run(`
            OPTIONAL MATCH (u:User{username:"${username}"})
            RETURN {encryptedPasswd: u.password}
        ` ))
        const { encryptedPasswd }= result.records[0].get(0)
        if (encryptedPasswd === null ) 
            return { 
                message: "User not found", 
                status: 404
            }
        else if (await compare_passwords(password, encryptedPasswd)){
            return Token.getCredentials(username)
        }
        else {
            return {
                message: "Wrong password",
                status: 401
            }
        }        
    }catch(error){
        return {  
            status: 400
        }
        console.log('[MODEL user login]: '+error)
    }finally{
        await session.close()
    }
}

module.exports = login