import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import {Switch, Route } from 'react-router-dom';
import PostListView from './components/PostListView';
import PostDetailsView from './components/PostDetailsView';

class App extends Component {
  render(){
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="verticalContainer">
              <Switch>
                  <Route exact path='/' render={props => (<PostListView {...props}/>)}/>
                  <Route exact path='/:category' render={props => (<PostListView {...props}/>)}/>
                  <Route exact path='/:category/:postId' component={PostDetailsView}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
