import React, { Component } from 'react';
import Entry from './Entry';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import CommentList from './CommentList'
import { changeCategory } from '../actions/category_actions';

class PostDetailsView extends Component {
    componentDidMount(){
        const {post, updateCategory} = this.props;
        post && updateCategory(post.category);
    }

    render(){
        const {post} = this.props;
        return (
            <div>
                {post && !post.deleted &&
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
    post: PropTypes.object,
    updateCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({posts}, ownProps) => ({
    post: posts.entities ? posts.entities[ownProps.match.params.postId] : null
});

const mapDispatchToProps = dispatch => {
    return {
        updateCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
