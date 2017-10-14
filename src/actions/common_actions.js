import ForumAPI from '../ForumAPI';

const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
const UPDATE_COMM_VOTE = 'UPDATE_COMM_VOTE';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const EDIT_POST = 'EDIT_POST';
const EDIT_COMMENT = 'EDIT_COMMENT';

const updateLocalVote = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? UPDATE_POST_VOTE : UPDATE_COMM_VOTE,
    updatedVote: updatedEntity.voteScore,
    entityId: updatedEntity.id,
    parentId: updatedEntity.parentId
});

const removeLocalEntity = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? REMOVE_POST : REMOVE_COMMENT,
    entityId: updatedEntity.id
});

const updateVote = (voteChange, entity, entityName) => (dispatch) => (
    ForumAPI.updatePOST(entityName, entity.id, {option : voteChange})
        .then(updatedEntity => dispatch(updateLocalVote(updatedEntity, entityName)))
);

const deleteEntity = (entityId, entityName) => (dispatch) => (
    ForumAPI.remove(entityName, entityId)
        .then(updatedEntity => dispatch(removeLocalEntity(updatedEntity, entityName)))
);

const editEntity = (entityId, entityName) => (dispatch) => (
    {}
);

export {updateVote, deleteEntity, editEntity,
        UPDATE_POST_VOTE, UPDATE_COMM_VOTE,
        REMOVE_POST, REMOVE_COMMENT,
        EDIT_POST, EDIT_COMMENT
};