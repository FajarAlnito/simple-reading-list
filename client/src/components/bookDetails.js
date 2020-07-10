import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBookQuery} from '../queries/queries';



class BookDetails extends Component{
    display(){
        const {book}= this.props.data;
        if(book){
            return(
                <div>
                    <h2>Title: {book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p>All book by author</p>
                    <ul className="other-book">
                        {
                            book.author.books.map(item=>{
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>No Book Selected</div>
            )
        }
    }
    render(){	
        return(
            <div id="book-details">
                <h1>Book details</h1>
                {this.display()}
            </div>
        );
    }
}


export default graphql(getBookQuery, {
    options: props=>{
        return{
            variables:{
                id: props.bookId
            }
        }
    }
})(BookDetails)