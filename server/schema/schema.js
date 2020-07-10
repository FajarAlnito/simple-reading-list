//schema : describe the shape of your data graph.
const graphql = require('graphql');
const _ = require('lodash');
const Book= require('../models/book');
const Author= require('../models/author');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql;

//dummy data

//Defining how graph will look
//function that take object as a parameter
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            //parent: data that has been found that user requested
            resolve(parent, args){
                // console.log(parent);
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // console.log(parent);
                /*
                return books that match authorId, authorId match 
                parent.id in this case the parent is author
                */
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent._id})
            }
        }
    })
});

//how to use graph to grab data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //querying book data
        book: {
            type: BookType,
            //defining argument that taken, in this case it taken the id
            args: {id:{type: GraphQLID}},
            //parent: parent coming for looking relationship between data
            //args is args above
            resolve(parent, args){
                //code to get data db / other source
                // return _.find(books, {id: args.id});
                return Book.findById(args.id);

            }
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data db / other source
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find().collation({ locale: "en" }).sort({name: 1});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find().collation({ locale: "en" }).sort({name: 1});
            }
        }
    }
});

//Used to add, update, delete data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new  GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });//author model
                // await author.save();
                // console.log("Save success");
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});