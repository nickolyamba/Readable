import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Comment from 'material-ui-icons/Comment';

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

const mapStateToProps = ({comments}, ownProps) => {
    const {postId} = ownProps;
    const commentsCount = !!comments && comments[postId] ? Object.keys(comments[postId]).length : 0;
    return {
        commentsCount
    }
};

export default connect(mapStateToProps)(CommentsCount);