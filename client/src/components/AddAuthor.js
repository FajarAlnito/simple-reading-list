import React, {Component} from 'react' 
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash'

import {getAuthorsQuery, addAuthorMutation} from '../queries/queries'

class AddAuthor extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            age:0
        };
    }
    submitForm(e){
        e.preventDefault();
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: this.state.age,
            },
            refetchQueries: [{query: getAuthorsQuery}]
        });
        
    }
    render(){	
        return(
            <div>
                <form className="add-author" onSubmit={this.submitForm.bind(this)}>
                    <h3>Add Author</h3>
                    <div className="field">
                        <label>Author name:</label>
                        <input type="text" name="author-name" id="author-name" placeholder="Author name" onChange={e => this.setState({name: e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Age:</label>
                        <input type="number" name="age" id="age" placeholder="Age" onChange={e => this.setState({age: parseInt(e.target.value)})} />
                    </div>
                    <button>+</button>
                </form>
            </div>
        );
    }
}


export default compose(
    graphql(addAuthorMutation, {name: "addAuthorMutation"})
)(AddAuthor)