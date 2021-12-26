import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';

const maxRows = 20;
const rowsBody = 2;

class PostForm extends React.Component {
    state = {
        author: '', body: '', title: '',
        category: this.props.selected
    };

    onFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    submitForm = (isSuccess) => {
        if(!isSuccess)
            this.props.onFormSubmit(null);
        else
            this.props.onFormSubmit(this.createPost());
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
                           multiline rowsMax={maxRows} rows={rowsBody}
                           onChange={this.onFieldChange('body')}
                />
                <div className="ctrlContainer">
                    <Button raised color="primary" className="formButton" onClick={()=>this.submitForm(false)}>
                        Cancel
                    </Button>
                    <Button raised color="primary" className="formButton" onClick={()=>this.submitForm(true)}>
                        Add Post
                    </Button>
                </div>

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
        if(Number.isInteger(parseInt(obj[0], 10)))
            nativeCategories.push(obj[1].name);
    }
    return {
        categories: nativeCategories,
        selected: categories.selected
    }
};

export default connect(mapStateToProps)(PostForm);