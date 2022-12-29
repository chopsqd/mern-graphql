require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

const PORT = process.env.PORT || 5000
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, (err) => {
    if(err) console.log('Server starting error: ', err)
    console.log(`Server started on port: ${PORT}...`)
})