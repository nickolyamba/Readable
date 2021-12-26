import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import PostListView from './components/PostListView';
import PostDetailsView from './components/PostDetailsView';

function App() {
    return (
      <div className="App">
          <Header headerText='Readable'/>
          <div className="verticalContainer">
              <Routes>
                  <Route exact path='/' render={props => (<PostListView {...props}/>)}/>
                  <Route exact path='/:category' render={props => (<PostListView {...props}/>)}/>
                  <Route exact path='/:category/:postId' component={PostDetailsView}/>
              </Routes>
          </div>
      </div>
    );
}

export default App;
