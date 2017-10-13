import ForumAPI from '../ForumAPI';

const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
const UPDATE_COMM_VOTE = 'UPDATE_COMM_VOTE';

const updateLocalVote = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? UPDATE_POST_VOTE : UPDATE_COMM_VOTE,
    updatedVote: updatedEntity.voteScore,
    entityId: updatedEntity.id,
    parentId: updatedEntity.parentId
});

const updateVote = (voteChange, entity, entityName) => (dispatch) => (
    ForumAPI.updatePOST(entityName, entity.id, {option : voteChange})
        .then(updatedEntity => dispatch(updateLocalVote(updatedEntity, entityName)))
);

export {updateVote, UPDATE_POST_VOTE, UPDATE_COMM_VOTE};