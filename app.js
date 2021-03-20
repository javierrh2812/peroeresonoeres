const dotenv = require('dotenv')
const server = require('./src/server.js')
dotenv.config()

const apikey = process.env.API_KEY

server(apikey) 


