import React, { Component } from 'react';
import ItemsList from './ItemsList';
import SortControl from './SortControl';

class Posts extends Component {
    render(){
        const selectedCategory = this.props.match.params.category;
        return (
            <div>
                <SortControl sortCategories={{date: 'timestamp', vote: 'voteScore'}}/>
                <ItemsList entityName={'posts'} selectedCategory={selectedCategory}/>
            </div>
        );
    }
}

Posts.propTypes = {
};

export default Posts;
