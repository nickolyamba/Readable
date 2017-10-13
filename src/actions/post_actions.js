import ForumAPI from '../ForumAPI';
import {fetchAllComments} from './comment_actions';

const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';

const addPost = (postObj) => ({
    type: ADD_POST,
    postObj
});

const editPost = ({title, body}) => ({
    type: EDIT_POST,
    title, body
});

const removePost = ({id}) => ({
    type: REMOVE_POST,
    id
});

const receivePosts = posts => {
    return{
        type: RECEIVE_POSTS,
        posts
    }
};

const fetchPosts = () => (dispatch) => (
    ForumAPI.getAll('posts')
        .then(posts => dispatch(receivePosts(posts)), error => console.log(error))
        .then(action => dispatch(fetchAllComments(action.posts)), error => console.log(error))
);

const changeSortBy = sortBy => ({
    type: CHANGE_SORT_BY,
    sortBy
});



export{
        ADD_POST, RECEIVE_POSTS, EDIT_POST, REMOVE_POST, CHANGE_SORT_BY,
        addPost, editPost, removePost, fetchPosts, changeSortBy
}