const driver = require('../database/connection')

const listKeys = async user => {
    const session = driver.session()
    try {
        const result = await session.readTransaction( rx => 
            rx.run(
                `
                MATCH(u:user{username:"${user}"})
                MATCH(u)<-[created_by]-(l:label)
                return l.title, l.description
                `
            )    
        )
        const returnedResult = result.records.map( label => { return {
            title: label.get(0), 
            description: label.get(1)} 
        })
        return {
            status: 200,
            message: returnedResult
        }
    } catch (error) {
        return {
            message: "Error when searching for user",
            status: 400
        }
    } finally {
        session.close()
    }
}

module.exports = listKeys