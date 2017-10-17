import { combineReducers } from 'redux'

import {RECEIVE_POSTS, EDIT_POST, CHANGE_SORT_BY} from '../actions/post_actions';
import {GET_COMMENTS} from '../actions/comment_actions';
import {GET_CATEGORIES, CHANGE_CATEGORY} from '../actions/category_actions';
import {UPDATE_POST_VOTE, UPDATE_COMM_VOTE, REMOVE_POST,
        REMOVE_COMMENT, ADD_COMMENT, ADD_POST
} from "../actions/common_actions";

const posts = (state={}, action) => {
    const{entityId} = action;
    switch(action.type){
        case ADD_POST:
            const {postObj} = action;
            return{
                ...state,
                'posts': {
                    ...state['posts'],
                    postObj
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
            const allCategories = {name: 'All Categories', path: ''};
            return {
                'entities': {allCategories, ...categories}, 'selected': ''
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

export default combineReducers({
    posts, comments, categories
})