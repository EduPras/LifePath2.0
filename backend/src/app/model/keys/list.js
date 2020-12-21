const driver = require('../../database/connection')

const listKeys = async () => {
    const session = driver.session()
    try {
        const result = await session.readTransaction( rx => 
            rx.run(
                `
                MATCH (l:label)-[created_by]->(u:user)
                return l.title, l.description, u.name
                `
            )    
        )
        const returnedResult = result.records.map( label => { return {
            title: label.get(0), 
            description: label.get(1),
            name: label.get(2)
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