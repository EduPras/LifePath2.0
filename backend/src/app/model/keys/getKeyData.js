const driver = require('../../database/connection')

const data = async title => {
    const session = driver.session()
    try {
        let result = await session.readTransaction( async rx => {
                let getLabel = await rx.run(
                    `
                    MATCH (a:Arranje{title:'${title}'})
                    RETURN a.label
                    `
                )
                const label = getLabel.records[0].get(0)
                console.log(label)
                let data =  await rx.run(
                    `
                    MATCH(k1:Key{belongs_to:"${title}"})-[s:sentence]->(k:Key)
                    RETURN k1.id, s.text, k.id
                    `
                )
                let moreData = await  rx.run(
                    `
                    MATCH(k:Key{belongs_to:"${title}"})-[s:sentence]->(l:Label)
                    RETURN k.id, s.text, l.name, l.type
                    `
                )    

                data = data.records.map( values => {
                    return {
                        parent: values.get(0).low,
                        sentence: values.get(1),
                        child: values.get(2).low,
                    }
                } )

                moreData = moreData.records.map( values => {
                    return {
                        parent: values.get(0).low,
                        sentence: values.get(1),
                        label: values.get(2),
                        type: values.get(3)
                    }
                } )
                return [...data, ...moreData]
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