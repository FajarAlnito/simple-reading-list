const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const port = 3500;
//Allow Cross Origin Request
app.use(cors());

//mongodb+srv://grizzlydb:<ofHtpOgWZhGOMGGu>@grizzly-db-4mr2u.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
/*
username: grizzlydb 
pass: ofHtpOgWZhGOMGGu
*/

//connect to mongodb atlas
// mongoose.connect('mongodb+srv://grizzlydb:ofHtpOgWZhGOMGGu@grizzly-db-4mr2u.gcp.mongodb.net/Grizzly-DB?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

//connect to mongodb local
mongoose.connect('mongodb://localhost/gql-db',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',()=>{
    console.log('\n [v]connected to database')
});
//middleware
app.use('/api', graphqlHTTP({
    schema,
    //enable GUI for testing graphql
    graphiql: true
}));

app.listen(port, ()=>{
    console.log(`\n [v]Listening to port ${port}`)
});
