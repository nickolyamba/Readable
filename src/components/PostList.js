import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import Entry from './Entry';

class PostList extends React.Component{
    render(){
        const {posts, selectedCategory} = this.props;

        return(
            <div>
                {posts && posts.map(post => (
                    !post.deleted &&
                    (selectedCategory === undefined || selectedCategory === post.category) &&
                        <Entry entry={post} entityName={'posts'} isDetailsView={false} key={post.id}/>
                ))}
            </div>
        );
    }
}

const getSorted = (posts, sortObj) => {
    if(posts === null || sortObj === null) return;

    sortObj.isDesc ? posts.sort(sortBy('-'+sortObj.property)) :
        posts.sort(sortBy(sortObj.property));
};

const mapStateToProps = ({posts}) => {
    const postsArray = posts.entities ? Object.values(posts.entities) : null;
    getSorted(postsArray, posts.sortBy);

    return {
      posts: postsArray,
  }
};


PostList.propTypes = {
    posts: PropTypes.array,
    selectCategory: PropTypes.string
};

export default connect(mapStateToProps)(PostList);
