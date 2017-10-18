import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import { pink } from 'material-ui/colors';
import VotingWidget from './VotingWidget';
import CommentsCount from './CommentsCount';
import {deleteEntity, editEntity} from '../actions/common_actions';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    card: {
        cursor: 'pointer',
        marginBottom: '20px',
        padding: '0px'
    },
    title: {
        fontSize: 18,
        color: theme.palette.text.secondaryAction,
    },
    iconPink: {
        fill: pink[600],
        margin: '0 3px 0 6px'
    },
    iconText:{
        display: 'inline',
        fontSize: '18px',
        marginTop: '2px'
    }
});

class Entry extends React.Component{
    state = {isRedirect: false};

    redirectOnClick = () => {
        this.setState({isRedirect: true});
    };

    render(){
        const {entry, entityName, isDetailsView, classes, deleteEntity, editEntity} = this.props;

        if(this.state.isRedirect)
            return <Redirect push to={`/${entry.category}/${entry.id}`}/>;

        return(
            <div>
                {entry &&
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar} onClick={this.redirectOnClick}>
                                {entry.author && entry.author.length > 0 ? entry.author[0].toUpperCase() : '?'}
                            </Avatar>
                        }
                        title={
                            <div className='containerSpread'>
                                <span onClick={this.redirectOnClick}>{entry.title}</span>
                                <div>
                                    <IconButton className={classes.button}
                                                onClick={() => deleteEntity(entry.id, entityName)} aria-label="Delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Edit">
                                        <EditIcon/>
                                    </IconButton>
                                </div>

                            </div>
                        }
                        subheader = {<span onClick={this.redirectOnClick}>
                            {`Posted by ${entry.author} on ${new Date(entry.timestamp).toLocaleString()}`}
                                    </span>}
                    />

                    <CardContent onClick={this.redirectOnClick}>
                        <Typography noWrap={!isDetailsView} type="body1" color="default">
                            {entry.body}
                        </Typography>
                    </CardContent>

                    <CardActions className="containerSpread">
                        <div>
                            <VotingWidget entity={entry} entityName={entityName}/>
                            {entityName === 'posts' && <CommentsCount postId={entry.id}/>}
                        </div>
                    </CardActions>

                </Card>
                }
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteEntity: (entityId, entityName) => dispatch(deleteEntity(entityId, entityName)),
    editEntity: (entityId, entityName) => dispatch(editEntity(entityId, entityName))
});

Entry.propTypes = {
    entry: PropTypes.object,
    classes: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    isDetailsView: PropTypes.bool.isRequired
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Entry));
