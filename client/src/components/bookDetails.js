import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBookQuery} from '../queries/queries';



class bookDetails extends Component{
    render(){	
        return(
            <div id="book-details">
                <p>Output book details here</p>
            </div>
        );
    }
}


export default graphql(getBookQuery)(bookDetails)