import { combineReducers } from 'redux'

import {ADD_POST, RECEIVE_POSTS, EDIT_POST, REMOVE_POST, CHANGE_SORT_BY} from '../actions/post_actions';
import {ADD_COMMENT, GET_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT} from '../actions/comment_actions';
import {GET_CATEGORIES, CHANGE_CATEGORY} from '../actions/category_actions';
import {UPDATE_POST_VOTE, UPDATE_COMM_VOTE} from "../actions/common_actions";

const posts = (state={}, action) => {
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
                sortBy: {property: 'timestamp', isDesc: true}
            };

        case CHANGE_SORT_BY:
            const {sortBy} = action;
            return {
                ...state, 'sortBy': sortBy
            };

        case UPDATE_POST_VOTE:
            const{updatedVote, entityId} = action;
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

        default:
            return state;
    }
};

const comments = (state={}, action) => {
    switch(action.type){
        case GET_COMMENTS:
            const{comments} = action;

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
            const{updatedVote, entityId, parentId} = action;
            console.log('actionUpdate', action)
            return{
                ...state,
                'entities': {
                    ...state.entities,
                    [parentId]: {
                        ...state.entities.parentId,
                        [entityId]: {
                            ...state.entities.parentId.entityId,
                            'voteScore': updatedVote
                        }

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