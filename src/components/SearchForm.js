import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import Api from '../services/Api';
import moment from 'moment';
import './SearchForm.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

let timeout = null;
class SearchForm extends React.Component{
  

  constructor(props) {
    super(props);

    this.state = {
      flyFrom: null,
      to: null,
      dateFrom: null,
      dateTo: null,
      returnFrom: null,
      returnTo: null,
      optionsFrom: [],
      optionsTo: [],
      typeFlight: "round",
      errors: {},
    };

    this.handleDateFromChange = this.handleDateFromChange.bind(this);
    this.handleDateToChange = this.handleDateToChange.bind(this);
    this.handleFlyFromChange = this.handleFlyFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchFromPlaces = this.searchFromPlaces.bind(this);
    this.searchToPlaces = this.searchToPlaces.bind(this);
    this.searchPlaces = this.searchPlaces.bind(this);
    this.getItemComponent = this.getItemComponent.bind(this);
    this.disableFromDates = this.disableFromDates.bind(this);
    this.disableToDates = this.disableToDates.bind(this);
  }

  handleDateFromChange(event, date) {
    this.setState({
      dateFrom: moment(date).format('DD/MM/YYYY'),
      dateTo: moment(date).format('DD/MM/YYYY'),
      errors: {}
    });
  }

  handleDateToChange(event, date) {
    this.setState({
      returnFrom: moment(date).format('DD/MM/YYYY'),
      returnTo: moment(date).format('DD/MM/YYYY'),
      errors: {}
    });
  }

  handleFlyFromChange(chosenRequest, index) {
    this.setState({
      flyFrom: chosenRequest.id,
      errors: {}
    });
  }

  handleToChange(chosenRequest, index) {
    this.setState({
      to: chosenRequest.id,
      errors: {}
    });
  }

  validateForm(fields) {
    const errors = {}

    Object.keys(fields).map((field) => {
      if(!fields[field]){
        if(field === "flyFrom" || field === "to") {
          errors[field] = 'Get an option from the list'
        }
        else {
          errors[field] = 'This field is required'
        }
      }
    })

    this.setState({errors})

    return errors
  }

  handleSubmit(event) {
    event.preventDefault()

    const {flyFrom, to, dateFrom, dateTo, returnFrom, returnTo, typeFlight} = this.state

    const errors = this.validateForm({flyFrom, to, dateFrom, dateTo})
    console.log(errors)
    if(Object.keys(errors).length === 0) {
      this.props.searchFlights({flyFrom, to, dateFrom, dateTo, returnFrom, returnTo, typeFlight})
    }
  }

  searchFromPlaces(searchText, dataSource, params){
    this.searchPlaces(searchText, "optionsFrom")
  }

  searchToPlaces(searchText, dataSource, params) {
    this.searchPlaces(searchText, "optionsTo")
  }

  getItemComponent(opt) {
    let Icon;
    let primaryText;
    let countryCode;
    if(opt.type === 0) { // Airport
      Icon = <FontIcon className="fa fa-plane" />;
      primaryText = `${opt.value}(${opt.id})`;
      countryCode = opt.parentId.split("_").pop().toUpperCase();
    }
    else if(opt.type === 1) { //Country
      Icon = <FontIcon className="fa fa-map-marker" />;
      primaryText = opt.value;
      countryCode = opt.parentId;
    }
    else if(opt.type === 2) { //City
      Icon = <FontIcon className="fa fa-building" />;
      primaryText = opt.value;
      countryCode = opt.parentId;
    }
    return (
      <MenuItem
        primaryText={primaryText}
        secondaryText={countryCode}
        leftIcon={Icon}
      />
    )
  }

  searchPlaces(searchText, key){
    if (searchText.length >= 1) {
      if (timeout) {  
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        Api.getPlaces({term: searchText})
        .then((response)=> {

          const items = response.map((opt) => {
              const ItemComponent = this.getItemComponent(opt)
              return {
                id: opt.id,
                text: opt.value,
                value: ItemComponent,
              }
          })

          this.setState({
            [key]: items,
          })
        })
      }, 500)
    }
    else {
      this.setState({
        [key]: [],
      })
    }
  }

  disableFromDates(date){
    return moment(date).isBefore(moment().subtract(1, "day"));
  }
  disableToDates(date){
    return moment(date).isBefore(moment(this.state.dateFrom).subtract(1, "day"));
  }


  render () {

    const {optionsFrom, optionsTo, errors} = this.state

    const icons = [{name: 'hola'},{name: 'que'}, {name: 'tal'}]

    const listOfIcon = icons.map((icon) => {
        return {
          text: icon.name,
          value: <MenuItem primaryText={icon.name} secondaryText={icon.name} leftIcon={<FontIcon className="fa fa-plane" />} />,
          
        }
    });

    console.log(listOfIcon, optionsFrom)

    return (

      <form onSubmit={this.handleSubmit}>
        <div className="search-form">
          <div className="half">
            <AutoComplete
              name="flyFrom"
              floatingLabelText="Origin"
              onUpdateInput={this.searchFromPlaces}
              onNewRequest={this.handleFlyFromChange}
              dataSource={optionsFrom}
              errorText={errors["flyFrom"]}
              openOnFocus={true}
              menuProps={{autoWidth: true}}
              filter={AutoComplete.fuzzyFilter}
            />
            <AutoComplete
              name="to"
              floatingLabelText="Destination"
              onUpdateInput={this.searchToPlaces}
              onNewRequest={this.handleToChange}
              dataSource={optionsTo}
              errorText={errors["to"]}
              openOnFocus={true}
              menuProps={{autoWidth: true}}
              filter={AutoComplete.fuzzyFilter}
            />
          </div>
          <div className="half">
            <DatePicker
              name="dateFrom"
              floatingLabelText="Departure date"
              container="inline"
              mode="landscape"
              autoOk={true}
              onChange={this.handleDateFromChange}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format}
              errorText={errors["dateFrom"]}
              shouldDisableDate={this.disableFromDates}
            />
            <DatePicker
              name="dateTo"
              floatingLabelText="Return date"
              container="inline"
              mode="landscape"
              autoOk={true}
              onChange={this.handleDateToChange}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format}
              errorText={errors["dateTo"]}
              shouldDisableDate={this.disableToDates}
            />
          </div>
          
        </div>
        <div style={{"textAlign": "center"}}>
          <RaisedButton
            icon={<FontIcon className="fa fa-search" />}
            backgroundColor="#a4c639"
            label="Search"
            type="Submit"
            secondary={true}
          />
        </div>


      </form>
    )
  }
}

SearchForm.propTypes = {
  searchFlights: PropTypes.func.isRequired,
};

export default SearchForm;