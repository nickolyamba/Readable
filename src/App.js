import React, { Component } from 'react';
import './App.css';
import Category from './components/Category';
import Header from './components/Header';
import PostList from './components/PostList';

/*https://material-ui-1dab0.firebaseapp.com/demos/buttons/*/
class App extends Component {
  render() {
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="container">
              <Category/>
              <PostList classes={{title: ''}}/>
          </div>
      </div>
    );
  }
}

export default App;
