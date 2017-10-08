import ForumAPI from '../ForumAPI';

const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const REMOVE_POST = 'REMOVE_POST';

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

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const fetchPosts = () => dispatch => (
    ForumAPI.getAll('posts').then(posts =>
        dispatch(receivePosts(posts)), error => console.error(error))
);

export{
        ADD_POST, RECEIVE_POSTS, EDIT_POST, REMOVE_POST,
        addPost, editPost, removePost, fetchPosts
}