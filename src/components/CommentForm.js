import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import uuid from 'uuid/v1'

class CommentForm extends React.Component {
    state = {
        author: '', body: ''
    };

    onFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    submitForm = () => {
        const comment = this.createComment();
        this.props.onFormSubmit(comment)
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

CommentForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
};

export default CommentForm;