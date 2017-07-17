import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {
  
  return (
    <MuiThemeProvider>
      <div className="App">
        <Navbar />
        <SearchPage />
      </div>
    </MuiThemeProvider>
  )
}

export default App;
