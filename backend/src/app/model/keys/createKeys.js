const driver = require('../../database/connection');

const createNodes = async ( keys, sentences, title ) => {
    const nodeSession = driver.session();
    try{
        await nodeSession.writeTransaction( tx => {
            Object.keys(keys).map( async key => {
                let first_node_ID = keys[key][0]
                let second_node_ID = keys[key][1]

                let first_sentence_text = sentences[first_node_ID]
                let second_sentence_text = sentences[second_node_ID]

                await tx.run(
                    `
                    MATCH (k1:key{id:"${key}", belongs_to:"${title}"})
                    MATCH (k2:key{id:"${key}", belongs_to:"${title}"})
                    CREATE (k1)-[:sentence{text:"${first_sentence_text}"}]->(:key{id:"${first_node_ID}", belongs_to:"${title}"})                    
                    CREATE (k2)-[:sentence{text:"${second_sentence_text}"}]->(:key{id:"${second_node_ID}", belongs_to:"${title}"})
                    `
                )
            })
        })
        return{ code: 200 }
        
    } catch (error) {
        console.log('[MODEL keys createNodes]: ' + error)
        return{ 
            code: 400 ,
            message: "Missing data"
        } 
    } finally {
        await nodeSession.close()
    }
}



const createKey = async (title, description, keys, sentences, user) => {
    const session = driver.session();
    try {
        const checkTitle = await session.writeTransaction(async tx=>{

            const verifyTitle = await tx.run(
                `
                OPTIONAL MATCH (t:label{title:"${title}"})
                return t.title
                `
            )
            if (verifyTitle.records[0].get(0) !== title) {

                await tx.run(
                    `
                    MATCH (u:user{username:"${user}"})
                    MERGE (new:label{ title:"${title}", description:"${description}"})
                    MERGE (new)-[:created_by]->(u)
                    CREATE (:key{id:"1", belongs_to:"${title}"})<-[:sentence{text:"${sentences[1]}"}]-(new)
                    CREATE (:key{id:"1.1", belongs_to:"${title}"})<-[:sentence{text:"${sentences[1.1]}"}]-(new)
                    `
                )
                return 200
            }
        })
        await session.close()
        if ( checkTitle===200 ) {
            let status = await createNodes(keys, sentences, title)
            return status
        }
        else 
            return {
                message: "Title has already been used",
                code: 401
            }
        
    } catch (error) {
        console.log('[MODEL keys createKeys]: '+error)
    }     
}

module.exports = createKey