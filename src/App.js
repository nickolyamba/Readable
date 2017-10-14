import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ItemsList from './components/ItemsList';
import SortControl from './components/SortControl';
import {Switch, Route } from 'react-router-dom';

/*https://material-ui-1dab0.firebaseapp.com/demos/buttons/*/
class App extends Component {
  render(){
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="ctrlContainer">
            <h3>List of Posts</h3>
          </div>
          <div className="verticalContainer">
              <SortControl sortCategories={{date: 'timestamp', vote: 'voteScore'}}/>
              <Switch>
                  <Route exact path='/' render={props => (<ItemsList {...props} entityName={'posts'}/>)}/>
                  <Route path='/:category' render={props => (<ItemsList {...props} entityName={'posts'}/>)}/>
              </Switch>
          </div>
      </div>
    );
  }
}

export default App;
