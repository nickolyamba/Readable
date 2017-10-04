import { combineReducers } from 'redux'

import {ADD_POST, EDIT_POST, REMOVE_POST, ADD_COMMENT} from '../actions';

const posts = (state={}, action) => {
    const {title, body, author, timestamp, voteScore, category, deleted, type} = action;
    switch(type){
        case ADD_POST:
            return{
                ...state,
                [timestamp]: {title, body, author, timestamp, voteScore, category, deleted}
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

export default combineReducers({
    posts, comments
})