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
                RETURN distinct a.title, a.description, a.label, u.name
                `
            )
        )

        result = result.records.map( item => {
            return{
                title: item.get(0),
                description: item.get(1),
                label: item.get(2),
                created_by: item.get(3)
            }
        } )
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