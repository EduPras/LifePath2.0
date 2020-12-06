const neo4j = require('neo4j-driver');
require('dotenv').config();
const driver =  neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),{ encrypted : true, resolver: e => ['localhost:3333']});
module.exports = driver;