import ForumAPI from '../ForumAPI';

const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
const UPDATE_COMM_VOTE = 'UPDATE_COMM_VOTE';
const REMOVE_POST = 'REMOVE_POST';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
const EDIT_POST = 'EDIT_POST';
const EDIT_COMMENT = 'EDIT_COMMENT';
const ADD_POST = 'ADD_POST';
const ADD_COMMENT = 'ADD_COMMENT';

const updateLocalVote = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? UPDATE_POST_VOTE : UPDATE_COMM_VOTE,
    updatedVote: updatedEntity.voteScore,
    entityId: updatedEntity.id,
    parentId: updatedEntity.parentId
});

const removeLocalEntity = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? REMOVE_POST : REMOVE_COMMENT,
    entityId: updatedEntity.id,
    parentId: updatedEntity.parentId ? updatedEntity.parentId : null
});

const createLocalEntity = (newEntity, entityName) => ({
    type: entityName === 'posts' ? ADD_POST : ADD_COMMENT,
    entity: newEntity,
});

const updateLocalEntity = (updatedEntity, entityName) => ({
    type: entityName === 'posts' ? EDIT_POST : EDIT_COMMENT,
    updatedEntity
});

const updateVote = (voteChange, entity, entityName) => (dispatch) => (
    ForumAPI.updatePOST(entityName, entity.id, {option : voteChange})
        .then(updatedEntity => dispatch(updateLocalVote(updatedEntity, entityName)))
);

const deleteEntity = (entityId, entityName) => (dispatch) => (
    ForumAPI.remove(entityName, entityId)
        .then(updatedEntity => dispatch(removeLocalEntity(updatedEntity, entityName)))
);

const creteEntity = (entity, entityName) => (dispatch) => (
    ForumAPI.create(entityName, entity)
        .then(updatedEntity => dispatch(createLocalEntity(updatedEntity, entityName)))
);

const editEntity = (entity, entityName) => (dispatch) => {
    const editedProps = entityName === 'posts' ? {'title': entity.title, 'body': entity.body} :
                                    {'timestamp': Date.now(), 'body': entity.body};
    return ForumAPI.updatePUT(entityName, entity.id, editedProps)
        .then(updatedEntity => dispatch(updateLocalEntity(updatedEntity, entityName)))
};

export {updateVote, deleteEntity, editEntity, creteEntity,
        UPDATE_POST_VOTE, UPDATE_COMM_VOTE,
        REMOVE_POST, REMOVE_COMMENT,
        EDIT_POST, EDIT_COMMENT,
        ADD_POST, ADD_COMMENT
};