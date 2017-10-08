import ForumAPI from '../ForumAPI';

const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

const addComment = commentObj => ({
    type: ADD_COMMENT,
    commentObj
});

const editComment = ({timestamp, body}) => ({
    type: EDIT_COMMENT,
    timestamp, body
});

const removeComment = id => ({
    type: REMOVE_COMMENT,
    id
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const fetchComments = (postId) => dispatch => (
    ForumAPI.getComments(postId).then(
        comments => dispatch(receiveComments(comments)),
        error => console.error(error)
    )
);

export{
    ADD_COMMENT, RECEIVE_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT,
    addComment, editComment, removeComment, fetchComments
}