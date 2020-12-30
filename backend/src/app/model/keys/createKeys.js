const driver = require('../../database/connection');

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
    return result.records[0].get(0) !== title
}

const createNodes = async (title, description, keys, user, label) => {
    const relationShip = driver.session()
    await relationShip.run(
        `
        MATCH (u:User{username:'${user}'})
        CREATE (a:Arranje{title:'${title}', description:'${description}', label:'${label}'})
        CREATE (a)<-[:created_by]-(u)
        CREATE (a)-[:init]->(:Key{id:1, belongs_to:'${title}'})
        `
    )
    await relationShip.close()
    const session = driver.session()
    await session.writeTransaction( tx => {
        keys.map( branch => {
            if(branch.label)
                tx.run(
                    `
                    MERGE (k:Key{id:${branch.parent}, belongs_to:'${title}'})
                    MERGE(l:Label{type:'${label}',name:'${branch.name}'})
                    CREATE (k)-[:sentence{text:'${branch.sentence}'}]->(l)
                    `
                )
            else
                tx.run(
                    `
                    MERGE (k:Key{id:${branch.parent}, belongs_to:'${title}'})
                    CREATE (k)-[:sentence{text:'${branch.sentence}'}]->(:Key{id:${branch.id}, belongs_to:'${title}'})
                    `
                )
        })
    })
    await session.close()
}

const createKeys = async (title, description, keys, user, label) => {
    const verifyTitle = await enableToCreate(title)
    if (verifyTitle) {
        await createNodes(title, description, keys, user, label)
        return { code: 200 }
    } else return { 
        code: 404,
        message: 'Title is already being used'
    }
}

module.exports = createKeys