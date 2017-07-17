import React from 'react';
import './FlightItem.css';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon'
import {Card, CardText} from 'material-ui/Card';
import FlagIconFactory from 'react-flag-icon-css';
import Route from './FlightItemRoute';

const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const MoreInfoItem = (props) => {
  return (
    <div className="list-item">
      <FontIcon style={{"color": "#666"}} className={props.icon} />
      <span className="text"> {props.text} </span>
      {props.value}
    </div>
  )
}

const FlighItem = (props) => {

  const moreInfo = [
    {
      icon: "fa fa-clock-o",
      text: "Departure time",
      value: props.item.fly_duration
    },{
      icon: "fa fa-clock-o",
      text: "Return time",
      value: props.item.return_duration
    },{
      icon: "fa fa-plane",
      text: "Planes",
      value: props.item.route.length
    },{
      icon: "fa fa-bed",
      text: "Nights in destination",
      value: props.item.nightsInDest
    }
  ]

  return(
    <Card style={{marginBottom: "20px"}}>
      <CardText>
        <div className="flight-box">
          <div>
            <div className="title">
              <div>
                {props.item.cityFrom}({props.item.flyFrom})
                <FlagIcon className='flag-icon'
                  code={props.item.countryFrom.code.toLowerCase()}
                />
              </div>
              <div>
                <FontIcon style={{color: "#666", margin: "0 16px", fontSize: "12px"}}
                  className="fa fa-arrows-h"
                />
              </div>
              <div>
                {props.item.cityTo}({props.item.flyTo})
                <FlagIcon className='flag-icon'
                  code={props.item.countryTo.code.toLowerCase()}
                />
              </div>
            </div>
            <div>
              {props.item.route.map((route) => <Route key={route.id} route={route} />)}
            </div>
          </div>
          <div className="more-info">
            <div className="list">
              {moreInfo.map((info, i) =>
                <MoreInfoItem key={i} icon={info.icon} text={info.text} value={info.value} />)
              }
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