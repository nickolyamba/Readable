import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const maxRows = 20;
const rowsBody = 2;

class EditForm extends React.Component {
    state = {...this.props.entity};

    onFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    submitForm = (isSuccess) => {
        return isSuccess ?
            this.props.onFormSubmit({...this.state}) :
            this.props.onFormSubmit(null);
    };

    render() {
        const {entity, entityName} = this.props;
        return (
            <form className="formContainer" noValidate autoComplete="on">
                <Typography type="title" gutterBottom align="center" color="secondary">
                    Edit {entityName}
                </Typography>
                {entity && Object.keys(entity).map(key => {
                    const isBody = key.toString() === 'body';
                    return(
                        <TextField id="required" label={key} placeholder={key} value={this.state[key]}
                                   className={'textField'}
                                   margin="normal" required multiline={isBody}
                                   rowsMax={isBody ? maxRows: 1} key={key}
                                   rows={key.toString() === 'body' ? rowsBody : 1}
                                   onChange={this.onFieldChange(key)}
                        />
                    )})}
                <div className="ctrlContainer">
                    <Button raised color="primary" className="formButton" onClick={()=>this.submitForm(false)}>
                        Cancel
                    </Button>
                    <Button raised color="primary" className="formButton" onClick={()=>this.submitForm(true)}>
                        Update {entityName}
                    </Button>
                </div>
            </form>
        )
    }
}

EditForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    entity: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired
};

export default EditForm;