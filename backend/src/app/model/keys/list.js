const driver = require('../../database/connection')

const listKeys = async () => {
    const session = driver.session()
    try {
        const result = await session.readTransaction( rx => 
            rx.run(
                `
                MATCH (l:Arranje)<-[created_by]-(u:User)
                return l.title, l.description, l.label, u.name
                `
            )    
        )
        const returnedResult = result.records.map( arranje => { return {
            title: arranje.get(0), 
            description: arranje.get(1),
            label: arranje.get(2),
            name: arranje.get(3)
        } 
        })
        return {
            status: 200,
            message: returnedResult
        }
    } catch (error) {
        return {
            message: "Bad request",
            status: 400
        }
    } finally {
        session.close()
    }
}

module.exports = listKeys