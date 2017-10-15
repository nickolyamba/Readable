import React, { Component } from 'react';
import EntryList from './EntryList';
import SortControl from './SortControl';
import PropTypes from 'prop-types';

class PostListView extends Component {
    render(){
        const selectedCategory = this.props.match.params.category;
        return (
            <div>
                <SortControl sortCategories={{date: 'timestamp', vote: 'voteScore'}}/>
                <EntryList entityName={'posts'} selectedCategory={selectedCategory}/>
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
