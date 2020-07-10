import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addAuthorMutation = gql`
    mutation AddAuthor($name: String!, $age: Int!){
        addAuthor(name: $name, age: $age){
            name 
            age 
        }
    }
`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id ){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    genre
                    id
                }
            }
        }
    }
`
export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation}