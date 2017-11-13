import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import reducer from './reducers';
import {fetchPosts} from './actions/post_actions';
import {fetchCategories} from './actions/category_actions';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

store.dispatch(fetchPosts('posts'));
store.dispatch(fetchCategories('categories'));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
