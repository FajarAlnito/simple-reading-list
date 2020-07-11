import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            selected: null
        }
    }

    displayBooks(){
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading books...</div> );
        } else {
            return data.books.map(book => {
                return(
                    <li onClick={e=>{this.setState({selected:book.id})}} key={ book.id } className="book">{ book.name }</li>
                );
            })
        }
    }
    displayDetails(){
        if(this.state.selected !== null){
            return <BookDetails bookId={this.state.selected} />
        }
    }
    render(){
        return(
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                {this.displayDetails()}
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
