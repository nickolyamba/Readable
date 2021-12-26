import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Comment from '@mui/icons-material/Comment';

class CommentsCount extends React.Component {
    render() {
        const {commentsCount} = this.props;
        return (
            <div className="containerLeft">
                <IconButton aria-label="Comments Count">
                    <Comment/>
                </IconButton>
                <Typography color="secondary" type="title" className="iconText">
                    {commentsCount}
                </Typography>
            </div>
        )

    }
}

CommentsCount.propTypes = {
    postId: PropTypes.string.isRequired
};

const getCount = (commentsObj) => {
    return Object.values(commentsObj)
        .filter(comment => !comment.deleted && !comment.parentDeleted).length;
};

const mapStateToProps = ({comments}, ownProps) => {
    const {postId} = ownProps;
    const commentsCount = !!comments && comments[postId] ? getCount(comments[postId]) : 0;
    return {
        commentsCount
    }
};

export default connect(mapStateToProps)(CommentsCount);