import React, { Component } from 'react';
import Entry from './Entry';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import CommentList from './CommentList'
import { changeCategory } from '../actions/category_actions';
import CardForm from './CardForm'
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import DialogForm from './DialogForm';
import AddIcon from 'material-ui-icons/Add';

class PostDetailsView extends Component {
    state = {expanded: false};

    componentDidMount(){
        const {post, updateCategory} = this.props;
        post && updateCategory(post.category);
    }

    handleCollapse = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render(){
        const {post} = this.props;
        return (
            <div>
                <Typography type="headline" gutterBottom align="center" color="secondary">
                    Post Details
                </Typography>
                {post && !post.deleted &&
                <div>
                    <Entry entry={post} entityName={'posts'} isDetailsView/>

                    <div className="containerSpread marginTop50">
                        <Typography type="title" gutterBottom align="center" color="secondary">
                            Comments
                        </Typography>
                        <div className="containerRight">
                            <Typography type="title" gutterBottom align="center" color="secondary">
                                Add Comment
                            </Typography>
                            <Button fab color='primary' onClick={this.handleCollapse} className="marginLeft10 marginBottom10">
                                <AddIcon/>
                            </Button>
                        </div>
                    </div>

                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardForm parentId={post.id} closeCollapse={() => this.handleCollapse()}/>
                    </Collapse>
                    <DialogForm/>
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
