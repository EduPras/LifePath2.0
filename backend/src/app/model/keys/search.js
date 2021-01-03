const driver = require('../../database/connection')

const search = async text => {
    const session = driver.session()
    
    try {
        let result = await session.readTransaction( rx => 
            rx.run(
                `
                OPTIONAL MATCH (n:Label) WHERE toLower(n.name)  contains toLower('${text}')
                OPTIONAL MATCH (n)<-[:sentence]-(lastKey:Key)
                WITH collect(distinct lastKey.belongs_to) as result

                OPTIONAL MATCH (x:Arranje) WHERE toLower(x.title)  contains toLower('${text}')
                WITH result + collect(distinct x.title) as result1

                OPTIONAL MATCH (k:Key)-[a:sentence]->() WHERE toLower(a.text) contains toLower('${text}')
                WITH result1 + collect(distinct k.belongs_to) as result2

                UNWIND result2 as results
                MATCH (a:Arranje{title:results})
                MATCH (a)<-[:created_by]-(u:User)
                MATCH (a)-[*]->(l:Label)
                RETURN distinct a.title, a.description, a.label, u.name, collect(l.name)
                `
            )
        )
        
        result = result.records.map( arranje => { return {
            title: arranje.get(0), 
            description: arranje.get(1),
            label: arranje.get(2),
            name: arranje.get(3),
            labelsName: arranje.get(4)
        }})
        return{
            status: 200,
            message: result
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Bad request",
            status: 400
        }
    } finally {
        await session.close()
    }
}

module.exports = search