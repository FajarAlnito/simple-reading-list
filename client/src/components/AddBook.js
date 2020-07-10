import React, {Component} from 'react';

import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            authorId:''
        };
    }

    displayAuthor(){
        let {loading, authors} = this.props.getAuthorsQuery;
        
        if(loading)
        {
            return( <option>Loading authors...</option> );
        } 
        else{
            return authors.map(author=>{
                return(
                    <option value={author.id} key={author.id}>{author.name}</option>
                )
            })
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
    render(){	
        return(
            <div>
                <form onSubmit={this.submitForm.bind(this)}>
                    <div className="field">
                        <label>Book name:</label>
                        <input type="text" name="book-name" id="book-name" placeholder="Book name" onChange={e => this.setState({name: e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" name="genre" id="genre" placeholder="Genre" onChange={e => this.setState({genre: e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select name="authors" id="authors" onChange={e => this.setState({authorId: e.target.value})}>
                            <option>Select Author</option>
                            {this.displayAuthor()}
                        </select>
                    </div>
                    
                        <button>+</button>
                    
                </form>
            </div>
        );
    }
}


export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
    )(AddBook);