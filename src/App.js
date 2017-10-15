import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import {Switch, Route } from 'react-router-dom';
import Posts from './components/Posts';

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
                  <Route exact path='/' render={props => (<Posts {...props}/>)}/>
                  <Route path='/:category' render={props => (<Posts {...props}/>)}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
