const driver = require('../../database/connection')

const data = async title => {
    const session = driver.session()
    try {
        let result = await session.readTransaction( async rx => {
                let data =  await rx.run(
                    `
                    MATCH(l:label{title:"${title}"})-[s:sentence]->(l1:key)
                    RETURN l.title, s.text, l1.id
                    `
                )
                let moreData = await  rx.run(
                    `
                    MATCH(l:key{belongs_to:"${title}"})-[s:sentence]->(l1:key)
                    RETURN l.id, s.text, l1.id
                    `
                )    

                data = data.records.map( values => {
                    return {
                        parent: values.get(0),
                        sentence: values.get(1),
                        child: values.get(2),
                    }
                } )

                moreData = moreData.records.map( values => {
                    return {
                        parent: values.get(0),
                        sentence: values.get(1),
                        child: values.get(2),
                    }
                } )
                return Object.assign(moreData, data)
            }
        )        
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