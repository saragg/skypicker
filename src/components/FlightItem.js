import React from 'react';
import './FlightItem.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon'
import {Card, CardText} from 'material-ui/Card';
import FlagIconFactory from 'react-flag-icon-css'

const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const Route = (props) => {
  const departureTime = moment.unix(props.route.dTime).format('LT')
  const arrivalTime = moment.unix(props.route.aTime).format('LT')

  return (
    <div className="route">
      <div>
        {props.route.cityFrom}({props.route.flyFrom})
        <div className="time">{departureTime}</div>
      </div>
      <div>
        <FontIcon style={{"color": "#666"}} className="fa fa-long-arrow-right" />
      </div>
      <div>
        {props.route.cityTo}({props.route.flyTo})
        <div className="time">{arrivalTime}</div>
      </div>
    </div>
  )
}

Route.propTypes = {
  route: PropTypes.object.isRequired,
};

const FlighItem = (props) => {

  return(
    <Card style={{marginBottom: "20px"}}>
      <CardText>
        <div className="flight-box">
          <div>
            <div className="title">
              <div>
                {props.item.cityFrom}({props.item.flyFrom})
                <FlagIcon className='flag-icon' code={props.item.countryFrom.code.toLowerCase()} />
              </div>
              <div>
                <FontIcon style={{color: "#666", margin: "0 16px", fontSize: "12px"}} className="fa fa-arrows-h" />
              </div>
              <div>
                {props.item.cityTo}({props.item.flyTo})
                <FlagIcon className='flag-icon' code={props.item.countryTo.code.toLowerCase()} />
              </div>
            </div>
            <div>
              {props.item.route.map((route) => <Route key={route.id} route={route} />)}
            </div>
          </div>
          <div className="more-info">
            <div className="list">
              <div className="list-item">
                <FontIcon style={{"color": "#666"}} className="fa fa-clock-o" />
                <span className="text"> Departure time </span>
                {props.item.fly_duration}
              </div>
              <div className="list-item">
                <FontIcon style={{"color": "#666"}} className="fa fa-clock-o" />
                <span className="text"> Return time </span>
                {props.item.return_duration}
              </div>
              <div className="list-item">
                <FontIcon style={{"color": "#666"}} className="fa fa-plane" />
                <span className="text"> Planes </span>
                {props.item.pnr_count}
              </div>
              <div className="list-item">
                <FontIcon style={{"color": "#666"}} className="fa fa-bed" />
                <span className="text"> Nights in destination </span>
                {props.item.nightsInDest}
              </div>
            </div>
          </div>
          <div className="price">
            {props.item.price}&euro;
          </div>
        </div>
      </CardText>
    </Card>
  )
}

FlighItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FlighItem;