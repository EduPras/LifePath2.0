const driver = require('../../database/connection')

const search = async text => {
    const session = driver.session()
    //CALL db.index.fulltext.createNodeIndex("titlesAndDescriptions",["key", "label", "sentence"],["text","title", "description"])
    try {
        let result = await session.readTransaction( rx => 
            rx.run(
                `
                CALL db.index.fulltext.queryNodes("titlesAndDescriptions", "${text}") YIELD node    
                MATCH (:label{title:node.title})-[created_by]->(u:user)
                RETURN node.title, node.description ,u.name
                `
            )
        )

        result = result.records.map( item => {
            return{
                title: item.get(0),
                description: item.get(1),
                created_by: item.get(2)
            }
        } )
        return{
            status: 200,
            message: result
        }
    } catch (error) {
        return {
            message: "Bad request",
            status: 400
        }
    } finally {
        await session.close()
    }
}

module.exports = search