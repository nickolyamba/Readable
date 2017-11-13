import React, { Component } from 'react';
import PostList from './PostList';
import SortControl from './SortControl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCategory } from '../actions/category_actions';
import Typography from 'material-ui/Typography';
import CardForm from './CardForm'
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import AddIcon from 'material-ui-icons/Add';
import DialogForm from './DialogForm';

class PostListView extends Component {
    state = {expanded: false};

    componentDidMount(){
        const category = this.props.match.params.category ?
            this.props.match.params.category : '';
        this.props.updateCategory(category);
    }

    // https://material-ui-next.com/demos/cards/
    handleCollapse = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render(){
        const selectedCategory = this.props.match.params.category;
        return (
            <div>
                <Typography type="headline" gutterBottom align="center" color="secondary" className="marginBottom20">
                    List of Posts
                </Typography>
                <SortControl sortCategories={{vote: 'voteScore', date: 'timestamp'}}/>
                <div className="containerRight">
                    <Typography type="title" gutterBottom align="center" color="secondary">
                        Add Post
                    </Typography>
                    <Button fab color='primary' onClick={this.handleCollapse} className="marginLeft10 marginBottom10">
                        <AddIcon/>
                    </Button>
                </div>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                    <CardForm closeCollapse={() => this.handleCollapse()}/>
                </Collapse>
                <PostList selectedCategory={selectedCategory}/>
                <DialogForm/>
            </div>
        );
    }
}

PostListView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            category: PropTypes.string
        })
    }),
    updateCategory: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        updateCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
};

export default connect(null, mapDispatchToProps)(PostListView);
