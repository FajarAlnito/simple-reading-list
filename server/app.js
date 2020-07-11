const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

//Allow Cross Origin Request
app.use(cors());

//dotenv setting
require('dotenv').config({path:`${__dirname}/../.env`});

const env= process.env
const PORT = env.SERVER_PORT;
const DB = `mongodb://${env.DB_HOST}/${env.DB_NAME}`;

//connect to mongodb local
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',()=>{
    console.log('\n [v]connected to database')
});
//middleware
app.use('/api', graphqlHTTP({
    schema,
    //enable GUI for testing graphql
    graphiql: true
}));

app.listen(PORT, ()=>{
    console.log(`\n [v]Listening to port ${PORT}`)
});