import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import {Switch, Route } from 'react-router-dom';
import PostListView from './components/PostListView';

class App extends Component {
  render(){
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="ctrlContainer">
            <h3>List of Posts</h3>
          </div>
          <div className="verticalContainer">
              <Switch>
                  <Route exact path='/' render={props => (<PostListView {...props}/>)}/>
                  <Route path='/:category' render={props => (<PostListView {...props}/>)}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
