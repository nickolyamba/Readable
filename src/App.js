import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MyReact</h2>
            {/*https://material-ui-1dab0.firebaseapp.com/demos/buttons/*/}
            <Button fab color="primary" aria-label="add">
                <AddIcon />
            </Button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
