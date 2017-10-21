import { combineReducers } from 'redux'

import {RECEIVE_POSTS, CHANGE_SORT_BY} from '../actions/post_actions';
import {GET_COMMENTS} from '../actions/comment_actions';
import {GET_CATEGORIES, CHANGE_CATEGORY} from '../actions/category_actions';
import {FLIP_DIALOG} from '../actions/dialog_actions'
import {UPDATE_POST_VOTE, UPDATE_COMM_VOTE, REMOVE_POST,
        REMOVE_COMMENT, ADD_COMMENT, ADD_POST, EDIT_POST, EDIT_COMMENT
} from "../actions/common_actions";

const posts = (state={}, action) => {
    const{entityId} = action;
    switch(action.type){
        case ADD_POST:
            const {entity} = action;
            return{
                ...state,
                'entities': {
                    ...state.entities,
                        [entity.id]: entity
                    }
            };

        case RECEIVE_POSTS:
            const {posts} = action;
            const postsObj = posts.reduce((posts, post) => {
                posts[post.id] = post;
                return posts;
            }, {});

            return {
                entities: {...postsObj},
                sortBy: {property: 'voteScore', isDesc: true}
            };

        case CHANGE_SORT_BY:
            const {sortBy} = action;
            return {
                ...state, 'sortBy': sortBy
            };

        case UPDATE_POST_VOTE:
            const{updatedVote} = action;
            return{
                ...state,
                    'entities': {
                    ...state.entities,
                        [entityId]: {
                            ...state.entities[entityId],
                            'voteScore': updatedVote
                        }
                    }
            };

        case EDIT_POST:
            const{updatedEntity} = action;
            return{
                ...state,
                'entities': {
                    ...state.entities,
                    [updatedEntity.id]: {
                        ...updatedEntity
                    }
                }
            };

        case REMOVE_POST:
            return{
                ...state,
                'entities': {
                    ...state.entities,
                    [entityId]: {
                        ...state.entities[entityId],
                        'deleted': true,
                    }
                }
            };

        default:
            return state;
    }
};

const comments = (state={}, action) => {
    const{entityId, parentId} = action;
    switch(action.type){
        case GET_COMMENTS:
            const{comments} = action;
            if(!comments) return state;

            const commentsObj = comments.reduce((commentsComb, comment) => {
                !commentsComb[comment.parentId] ?
                    commentsComb[comment.parentId] = {[comment.id]: comment} :
                    commentsComb[comment.parentId][comment.id] = comment;
                return commentsComb;
            }, {});

            return{
                ...state, ...commentsObj
            };

        case UPDATE_COMM_VOTE:
            const{updatedVote} = action;
            return{
                ...state,
                    [parentId]: {
                        ...state[parentId],
                        [entityId]: {
                            ...state[parentId][entityId],
                            'voteScore': updatedVote
                        }
                    }
            };

        case EDIT_COMMENT:
            const{updatedEntity} = action;
            console.log(updatedEntity);
            return{
                ...state,
                [updatedEntity.parentId]: {
                    ...state[updatedEntity.parentId],
                    [updatedEntity.id]: {
                        ...updatedEntity
                    }
                }
            };

        case REMOVE_POST:
            const parentPostId = action.entityId;
            if(!state[parentPostId]){
                return state;
            }
            else {
                const commentIds = Object.keys(state[parentPostId]);
                if(commentIds.length <= 0) return state;

                // update comment entities
                const keysObj = {};
                for (const commentId of commentIds) {
                    keysObj[commentId] = {
                        ...state[parentPostId][commentId],
                        'parentDeleted': true
                    }
                }

                return {
                    ...state,
                    [parentPostId]: {
                        ...state[parentPostId],
                        ...keysObj
                    }
                };
            }

        case ADD_COMMENT:
            const{entity} = action;
            return{
                ...state,
                [entity.parentId]: {
                    ...state[entity.parentId],
                    [entity.id]: entity
                }
            };

        case REMOVE_COMMENT:
            return{
                ...state,
                [parentId]: {
                    ...state[parentId],
                    [entityId]: {
                        ...state[parentId][entityId],
                        'deleted': true
                    }
                }
            };

        default:
            return state;
    }
};

const categories = (state={}, action) => {
    switch(action.type){
        case GET_CATEGORIES:
            const {categories} = action;
            const urlArr = window.location.href.split('/');
            let initSelected = urlArr && urlArr.length >= 3 ? urlArr[3] : '';

            const allCategories = {name: 'All Categories', path: ''};
            return {
                'entities': {allCategories, ...categories}, 'selected': initSelected
            };
        case CHANGE_CATEGORY:
            const {selected} = action;
            return {
                ...state, 'selected': selected
            };
        default:
            return state;
    }
};

const dialog = (state={'entity': null}, action) => {
    const {type, entity} = action;
    switch(type){
        case FLIP_DIALOG:
            return {
                ...state,
                    'entity': entity
            };

        default:
            return state;
    }
};

export default combineReducers({
    posts, comments, categories, dialog
})