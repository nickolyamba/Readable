import React, { Component } from 'react';
import PostList from './PostList';
import SortControl from './SortControl';
import PropTypes from 'prop-types';

class PostListView extends Component {
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
    })
};

export default PostListView;
