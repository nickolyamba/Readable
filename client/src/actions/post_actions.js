import ForumAPI from '../ForumAPI';
import {fetchAllComments} from './comment_actions';

const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const CHANGE_SORT_BY = 'CHANGE_SORT_BY';

const receivePosts = posts => {
    return{
        type: RECEIVE_POSTS,
        posts
    }
};

const fetchPosts = () => (dispatch) => (
    ForumAPI.getAll('posts')
        .then(posts => dispatch(receivePosts(posts)), error => console.log(error))
        .then(action => dispatch(fetchAllComments(action ? action.posts : null)), error => console.log(error))
);

const changeSortBy = sortBy => ({
    type: CHANGE_SORT_BY,
    sortBy
});

export{
        ADD_POST, RECEIVE_POSTS, EDIT_POST, CHANGE_SORT_BY,
        fetchPosts, changeSortBy
}