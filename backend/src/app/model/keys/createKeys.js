const driver = require('../../database/connection');

const enableToCreate = async title =>  {
    const session = driver.session()
    const result = await session.writeTransaction( tx => 
        tx.run(
            `
            OPTIONAL MATCH (t:label{title:"${title}"})
            return t.title
            `
        )
    )
    await session.close()
    return result.records[0].get(0) !== title
}

const createNodes = async (title, description, keys, user) => {
    const session = driver.session()
    const firstNode = keys[1]
    const secondeNode = keys[1.1]
    firstNode.label = firstNode.label || 'key'
    secondeNode.label = secondeNode.label || 'key'
    await session.writeTransaction( tx => {
        tx.run(
            `
            MATCH (u:user{username:"${user}"})
            CREATE (new:label{title:"${title}", description:"${description}"})
            CREATE (new)-[:created_by]->(u)
            CREATE (new)-[:sentence{text:"${firstNode.sentence}"}]->(:${firstNode.label}{id:"1", belongs_to:"${title}"})            
            CREATE (new)-[:sentence{text:"${secondeNode.sentence}"}]->(:${secondeNode.label}{id:"1.1", belongs_to:"${title}"})
            `
        )
    })
    await session.close()

    delete keys[1]
    delete keys[1.1]

    const nodeSession = driver.session()
    await nodeSession.writeTransaction( async tx => {
        Object.keys(keys).map( _id => {
            const current = keys[_id]
            if(!current.label){
                tx.run(
                    `
                    MERGE (parent:key{id:"${current.parent}", belongs_to:"${title}"})
                    MERGE (k:key{id:"${_id}", belongs_to:"${title}"})
                    MERGE (parent)-[:sentence{text:"${current.sentence}"}]->(k)
                    `
                )
            }
        })

        Object.keys(keys).map( _id => {
            const current = keys[_id]
            if(current.label){
                tx.run(
                    `
                    MATCH (parent:key{id:"${current.parent}", belongs_to:"${title}"})
                    MERGE (l:${current.label}{name:"${current.name}"})
                    MERGE (parent)-[:sentence{text:"${current.sentence}"}]->(l)
                    `
                )
            }
        })
        
    } )
    await nodeSession.close()
}


const createKeys = async (title, description, keys, user) => {
    const verifyTitle = await enableToCreate(title)
    if (verifyTitle) await createNodes(title, description, keys, user)
    return { code: 200 }
}

module.exports = createKeys