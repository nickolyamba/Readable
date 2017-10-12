import ForumAPI from '../ForumAPI';

const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const GET_COMMENTS = 'GET_COMMENTS';
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

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
});

const fetchAllComments = posts => dispatch => {
    const promises = posts.reduce((promises, post)=>{
        const promise = ForumAPI.getComments(post.id);
        promises.push(promise);
        return promises;
    }, []);

    return Promise.all(promises)
        .then(comments => dispatch(getComments(...comments)),
                error => console.error(error))
};

export{
    ADD_COMMENT, GET_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT,
    addComment, editComment, removeComment, fetchAllComments,
    getComments
}