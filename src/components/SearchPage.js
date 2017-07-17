import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ListOf from './List';
import FlightItem from './FlightItem';
import ContainerMessage from './ContainerMessage';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon'

import Api from '../services/Api';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      noResults: false,
      loading: false,
      noSearchYet: true,
    }

    this.searchFlights = this.searchFlights.bind(this)
  }

  searchFlights = (params) => {
    this.setState({
      flights: [],
      loading: true
    })
    Api.getFlights(params)
    .then((response) => {

      this.setState({
        flights: response.data,
        noResults: response.data.length === 0,
        loading: false,
        noSearchYet: false
      })
    })
    .catch(()=>
      this.setState({
        noResults: true,
        flights: [],
        loading: false
      })
    )
  }

  render() {
    const { flights, noResults, loading, noSearchYet } = this.state

    const ResultsList = ListOf(FlightItem)

    return (
      <div>
        <div className="upper-container">
          <SearchForm searchFlights={this.searchFlights}/>
        </div>
        <div className="main-container">
          {loading && <div className="loading">
            <CircularProgress size={80} thickness={5} />
          </div>}
          {noSearchYet && <ContainerMessage icon="fa fa-globe"
            message="Make one search and start traveling!"/>
          }
          <ResultsList items={flights} noResults={noResults}/>
        </div>
      </div>
    )
  }
}

export default SearchPage;