import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import SearchForm from './components/SearchForm';
import ListOf from './components/ListOf';
import FlightItem from './components/FlightItem';

import Api from './services/Api';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      noResults: false
    }

    this.searchFlights = this.searchFlights.bind(this)
  }

  componentWillMount() {
    Api.getFlights(
      {
        flyFrom: "barcelona",
        to: "london",
        dateFrom: "25/07/2017",
        dateTo: "25/07/2017",
        returnFrom: "31/07/2017",
        returnTo: "31/07/2017",
        typeFlight: "round"
      }
    ).then((response) => {
      this.setState({flights: response.data, noResults: response.data.length === 0})
    })
  }

  searchFlights = (params) => {
    Api.getFlights(params)
    .then((response) => {
      this.setState({flights: response.data, noResults: response.data.length === 0})
    })
    .catch(()=>
      this.setState({
        noResults: true,
        flights: []
      })
    )
  }


  render() {

    const { flights, noResults } = this.state

    const ResultsList = ListOf(FlightItem)

    return (
      <MuiThemeProvider>
        <div className="App">
          <Toolbar style={{background: "#fff"}}>
            <ToolbarGroup>
              <ToolbarTitle text="Kiwi Skypicker" />
            </ToolbarGroup>
            <ToolbarGroup>
              <FontIcon className="fa fa-github" />
            </ToolbarGroup>
          </Toolbar>
          <div className="upper-container">
            <SearchForm searchFlights={this.searchFlights}/>
          </div>
          <div className="main-container">
            <ResultsList items={flights} noResults={noResults}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
