import { combineReducers } from 'redux'

import {ADD_POST, RECEIVE_POSTS, EDIT_POST, REMOVE_POST} from '../actions/post_actions';
import {ADD_COMMENT, RECEIVE_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT} from '../actions/comment_actions';
import {GET_CATEGORIES} from '../actions/category_actions';

const posts = (state={}, action) => {
    const {postObj} = action;
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                'posts': {
                    ...state['posts'],
                    postObj
                }
            };
        case RECEIVE_POSTS:
            const {posts} = action;
            return {
                ...state, [posts]: posts
            };

        default:
            return state;
    }
};

const comments = (state={}, action) => {
    const {parentId, body, author, timestamp, voteScore, category, parentDeleted, type} = action;
    switch(type){
        case ADD_COMMENT:
            let newState = {...state};
            if(!state[parentId])
                newState[parentId] = [];
            newState[parentId].add({parentId, body, author, timestamp, voteScore, category, parentDeleted});
            return newState;

        default:
            return state;
    }
};

const categories = (state={}, action) => {
    const {categories} = action;
    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state, [categories]: categories
            };
        default:
            return state;
    }
};

export default combineReducers({
    posts, comments, categories
})