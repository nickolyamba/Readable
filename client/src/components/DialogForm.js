import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import {editEntity} from '../actions/common_actions';
import {flipDialog} from '../actions/dialog_actions';
import Dialog, {DialogContent} from 'material-ui/Dialog';
import EditForm from "./EditForm";

// sources used:
// example from https://material-ui-next.com/demos/dialogs/
const body = 'body';
const title = 'title';

class DialogForm extends React.Component {

    handleSubmitForm = (editedProps) => {
        if(!editedProps){
            this.props.closeDialog(null);
            return;
        }
        const {entity, editEntity, closeDialog} = this.props;
        const updatedEntity = {...entity, ...editedProps};

        if(entity.parentId)
            editEntity(updatedEntity, 'comments');
        else
            editEntity(updatedEntity, 'posts');
        closeDialog(null);
    };

    handleCloseDialog = () => {
        this.props.closeDialog(null);
    };

    render() {
        const {entity} = this.props;
        if(!entity) return null;
        return (
            <div>
                <Dialog open={!!entity} maxWidth='md' fullWidth
                        onRequestClose={this.handleCloseDialog} onEscapeKeyUp={this.handleCloseDialog}>
                    <div className="containerRight">
                        <IconButton onClick={this.handleCloseDialog}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <DialogContent>
                        {entity.parentId ? // if comment
                            <EditForm entity={{[body]: entity[body]}} entityName={'Comment'}
                                           onFormSubmit={(comment) => this.handleSubmitForm(comment)}/> :
                            <EditForm entity={{[title]: entity[title], [body]: entity[body]}} entityName={'Post'}
                                           onFormSubmit={(post) => this.handleSubmitForm(post)}/>
                        }
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

DialogForm.propTypes = {
    entity: PropTypes.object,
    editEntity: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired
};

const mapStateToProps = ({dialog}) => {
    return {entity: dialog.entity}
};

const mapDispatchToProps = dispatch => {
    return {
        closeDialog: (nullObj) => dispatch(flipDialog(nullObj)),
        editEntity: (entity, entityName) => dispatch(editEntity(entity, entityName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogForm);