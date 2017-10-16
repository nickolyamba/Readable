import React, { Component } from 'react';
import Entry from './Entry';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import CommentList from './CommentList'

class PostDetailsView extends Component {
    render(){
        const {post} = this.props;
        return (
            <div>
                {post &&
                <div>
                    <Entry entry={post} entityName={'posts'} isDetailsView/>
                    <Typography type="title" gutterBottom align="center" color="secondary">
                        Comments
                    </Typography>
                    <CommentList postId={post.id}/>
                </div>
                }
            </div>
        );
    }
}

PostDetailsView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            postId: PropTypes.string.isRequired
        })
    }),
    post: PropTypes.object
};

const mapStateToProps = ({posts}, ownProps) => ({
    post: posts.entities ? posts.entities[ownProps.match.params.postId] : null
});

export default connect(mapStateToProps)(PostDetailsView);
