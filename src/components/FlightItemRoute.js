import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon'
import moment from 'moment';
import './FlightItemRoute.css';


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

export default Route;