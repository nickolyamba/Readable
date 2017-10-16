import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getSorted} from "../utils/sortUtil";
import Entry from './Entry';

const defaultSort = {property: 'voteScore', isDesc: true};

class CommentList extends React.Component{
    render(){
        const {comments} = this.props;
        return(
            <div>
                {comments && comments.map(comment => (
                    !comment.deleted && !comment.parentDeleted &&
                    <Entry entry={comment} entityName={'comments'} isDetailsView={false} key={comment.id}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({comments}, ownProps) => {
    const {postId} = ownProps;
    const postComments = comments[postId] ? Object.values(comments[postId]) : null;
    getSorted(postComments, defaultSort);

    return {
      comments: postComments
  }
};


CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array
};

export default connect(mapStateToProps)(CommentList);
