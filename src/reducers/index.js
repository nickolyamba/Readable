import { combineReducers } from 'redux'

import {ADD_POST, RECEIVE_POSTS, EDIT_POST, REMOVE_POST, CHANGE_SORT_BY} from '../actions/post_actions';
import {ADD_COMMENT, RECEIVE_COMMENTS, EDIT_COMMENT, REMOVE_COMMENT} from '../actions/comment_actions';
import {GET_CATEGORIES, CHANGE_CATEGORY} from '../actions/category_actions';

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