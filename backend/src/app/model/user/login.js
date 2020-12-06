const driver = require('../database/connection')


const createUser = async (user, password) => {
    try{
        console.log(driver)
        const session = driver.session()
        const result = await session.run(`CREATE (u:user{username:${user}, password:${password}})` )
        return result
    }catch(error){
        console.log('[MODEL user]: '+error)
    }finally{
        await session.close()
    }
}

module.exports = createUser