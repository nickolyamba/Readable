import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { v1 as uuid } from 'uuid';

const maxRows = 20;
const rowsBody = 3;

class CommentForm extends React.Component {
    state = {
        author: '', body: ''
    };

    onFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    submitForm = (isSuccess) => {
        if(!isSuccess)
            this.props.onFormSubmit(null);
        else
            this.props.onFormSubmit(this.createComment());
    };

    createComment = () => {
        return{
            id: uuid(),
            author: this.state.author,
            body: this.state.body,
            parentId: this.props.postId,
            timestamp: Date.now()
        }
    };

    render() {

        return (
            <form className="formContainer" noValidate autoComplete="on">
                <Typography type="title" gutterBottom align="center" color="secondary">
                    Add New Comment
                </Typography>
                <TextField id="required" label="Author" placeholder="Author"
                           className="textField" margin="normal" required
                           onChange={this.onFieldChange('author')}
                />
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
                        Add Comment
                    </Button>
                </div>
            </form>
        )

    }
}

CommentForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
};

export default CommentForm;