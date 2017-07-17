import React from 'react';
import './ContainerMessage.css';
import FontIcon from 'material-ui/FontIcon';

const ContainerMessage = (props) => {
  const iconStyle = {
    color: "#999",
    fontSize: "90px"
  }
  return (
    <div className="container-message">
      <FontIcon style={iconStyle} className={props.icon}/>
      <p>{props.message}</p>
    </div>
  )
}

export default ContainerMessage