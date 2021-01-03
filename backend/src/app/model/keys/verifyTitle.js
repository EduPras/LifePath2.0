const driver = require('../../database/connection')
const enableToCreate = async title =>  {
    const session = driver.session()
    const result = await session.writeTransaction( tx => 
        tx.run(
            `
            OPTIONAL MATCH (t:Arranje{title:"${title}"})
            return t.title
            `
        )
    )
    await session.close()
    if (result.records[0].get(0) !== title) {
        return{
            status: 200,
            message: `This title is available!`
        }
    } else {
        return{
            status: 404,
            message: `This title is already being used!`
        }
    }
}

module.exports = enableToCreate