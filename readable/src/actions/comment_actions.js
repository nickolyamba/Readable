import ForumAPI from '../ForumAPI';

const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const GET_COMMENTS = 'GET_COMMENTS';

const addComment = commentObj => ({
    type: ADD_COMMENT,
    commentObj
});

const editComment = ({timestamp, body}) => ({
    type: EDIT_COMMENT,
    timestamp, body
});

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
});

const fetchAllComments = posts => dispatch => {
    if(!posts) return null;
    const promises = posts.reduce((promises, post)=>{
        const promise = ForumAPI.getComments(post.id);
        promises.push(promise);
        return promises;
    }, []);

    return Promise.all(promises)
        .then(comments => {
            // flatten 2D array
            const commArray = [].concat(...comments);
            dispatch(getComments(commArray))
            },
            error => console.error(error))
};

export{
    ADD_COMMENT, GET_COMMENTS, EDIT_COMMENT,
    addComment, editComment, fetchAllComments,
    getComments
}