// should have controls to edit or delete the post, should have a control to add a new comment.

const ADD_POST = 'ADD_POST';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_POST = 'EDIT_POST';
const REMOVE_POST = 'REMOVE_POST';

const addPost = ({title, body, author, timestamp, voteScore, category, deleted}) => ({
    type: ADD_POST,
    title, body, author, timestamp, voteScore, category, deleted
});

const editPost = ({title, body, author, timestamp, voteScore, category, deleted}) => ({
    type: EDIT_POST,
    title, body, author, timestamp, voteScore, category, deleted
});

const removePost = ({id}) => ({
    type: REMOVE_POST,
    id
});

const addComment = ({parentId, body, author, timestamp, voteScore, category, parentDeleted}) => ({
    type: ADD_COMMENT,
    parentId, body, author, timestamp, voteScore, category, parentDeleted
});

export {ADD_POST, EDIT_POST, REMOVE_POST, ADD_COMMENT, addPost, editPost, removePost, addComment}