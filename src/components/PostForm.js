import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import uuid from 'uuid/v1'

class PostForm extends React.Component {
    state = {
        author: '', body: '', title: '',
        category: this.props.selected
    };

    onFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    submitForm = () => {
        const comment = this.createPost();
        this.props.onFormSubmit(comment)
    };

    createPost = () => {
        return{
            id: uuid(),
            title: this.state.title,
            category: this.state.category,
            author: this.state.author,
            body: this.state.body,
            timestamp: Date.now()
        }
    };

    render() {
        const {categories} = this.props;
        return (
            <form className="formContainer" noValidate autoComplete="on">
                <Typography type="title" gutterBottom align="center" color="secondary">
                    Add New Post
                </Typography>
                <TextField id="required" label="Title" placeholder="Title"
                           className="textField" margin="normal" required
                           onChange={this.onFieldChange('title')}
                />
                <TextField id="required" label="Author" placeholder="Author"
                           className="textField" margin="normal" required
                           onChange={this.onFieldChange('author')}
                />
                <TextField
                    id="select-currency" select label="Select" className="textField"
                    value={this.state.category} onChange={this.onFieldChange('category')}
                    SelectProps={{MenuProps: {className: "maxWidth300"}}}
                    helperText="Select category"
                    margin="normal"
                >
                    {categories.map((option,i) => (

                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField id="required" label="Body" placeholder="Body"
                           className="multLineTextField" margin="normal" required
                           multiline rowsMax={10} rows={5}
                           onChange={this.onFieldChange('body')}
                />
                <Button raised color="primary" className="formButton" onClick={this.submitForm}>
                    Add Comment
                </Button>
            </form>
        )

    }
}

PostForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired
};

const mapStateToProps = ({categories}) => {
    const categoryArray = categories.entities ? Object.entries(categories.entities) : [];
    let nativeCategories = [];
    for(const obj of categoryArray){
        if(Number.isInteger(parseInt(obj[0])))
            nativeCategories.push(obj[1].name);
    }
    return {
        categories: nativeCategories,
        selected: categories.selected
    }
};

export default connect(mapStateToProps)(PostForm);