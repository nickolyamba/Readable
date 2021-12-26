import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import {updateVote} from '../actions/common_actions';

class VotingWidget extends React.Component {
    render() {
        const {entity, entityName, updateVoteScore} = this.props;
        return (
            <div className="containerLeft marginRight20">
                <IconButton aria-label="Thumb Up">
                    <ThumbUp onClick={()=>updateVoteScore('upVote', entity, entityName)}/>
                </IconButton>
                <Typography color="secondary" type="title" className="iconText">
                    {entity.voteScore}
                </Typography>
                <IconButton aria-label="Thumb Down">
                    <ThumbDown onClick={()=>updateVoteScore('downVote', entity, entityName)}/>
                </IconButton>
            </div>
        )

    }
}

VotingWidget.propTypes = {
    entity: PropTypes.shape({
        voteScore: PropTypes.number.isRequired
    }),
    entityName: PropTypes.string.isRequired,
    updateVoteScore: PropTypes.func.isRequired
};

const mapStateToProps = () => {
    return {
    }
};

function mapDispatchToProps (dispatch) {
    return {
        updateVoteScore: (voteChange, entity, entityName) => dispatch(updateVote(voteChange, entity, entityName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingWidget);