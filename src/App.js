import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import PostList from './components/PostList';
import {Switch, Route } from 'react-router-dom';

/*https://material-ui-1dab0.firebaseapp.com/demos/buttons/*/
class App extends Component {
  render(){
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="ctrl-container">
            <h3>List of Posts</h3>
          </div>
          <div className="vertical-container">
              <Switch>
                  <Route exact path='/' component={PostList}/>
                  <Route path='/:category' component={PostList}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
