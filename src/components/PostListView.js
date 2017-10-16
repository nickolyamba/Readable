import React, { Component } from 'react';
import PostList from './PostList';
import SortControl from './SortControl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCategory } from '../actions/category_actions';

class PostListView extends Component {
    componentDidMount(){
        const category = this.props.match.params.category ?
            this.props.match.params.category : '';
        this.props.updateCategory(category);
    }

    render(){
        const selectedCategory = this.props.match.params.category;
        return (
            <div>
                <div className="ctrlContainer">
                    <h3>List of Posts</h3>
                </div>
                <SortControl sortCategories={{date: 'timestamp', vote: 'voteScore'}}/>
                <PostList selectedCategory={selectedCategory}/>
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
