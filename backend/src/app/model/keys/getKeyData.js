const driver = require('../database/connection')

const data = async title => {
    const session = driver.session()
    try {
        let result = await session.readTransaction( rx => 
            rx.run(
                `
                MATCH(l:key{belongs_to:"${title}"})-[s:sentence]->(l1:key)
                RETURN l.id, s.text, l1.id
                `
            )    
        )
        result = result.records.map( values => {
            return {
                parent: values.get(0),
                sentence: values.get(1),
                child: values.get(2),
            }
        } )
        return {
            status: 200,
            message: result
        }
    } catch (error) {
        return{
            message: "Failed to find this arrangement of keys",
            code: 400
        }
    } finally {
        session.close()
    }
}

module.exports = data