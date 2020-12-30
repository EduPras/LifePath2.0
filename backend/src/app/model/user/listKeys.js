const driver = require('../../database/connection')

const listKeys = async user => {
    const session = driver.session()
    try {
        const checkUser = await session.readTransaction( rx => 
            rx.run(
                `
                OPTIONAL MATCH(u:User{username:"${user}"})
                return u.name
                `
            )    
        )
        if (checkUser.records[0].get(0) !== null){
            const result = await session.readTransaction( rx => 
                rx.run(
                    `
                    MATCH(u:User{username:"${user}"})
                    MATCH(u)-[created_by]->(a:Arranje)
                    return a.title, a.description, a.label
                    `
                )    
            )
            const returnedResult = result.records.map( arranje => { return {
                title: arranje.get(0), 
                description: arranje.get(1),
                label: arranje.get(2)
                } 
            })
            return {
                status: 200,
                message: returnedResult
            }
        } else return{
            message: "This user doesn't exists",
            status: 404
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Error when searching for user",
            status: 400
        }
    } finally {
        session.close()
    }
}

module.exports = listKeys