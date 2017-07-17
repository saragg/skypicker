import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import './List.css';

const ListOf = (ListItem) => {

  const List = (props) => {
    const iconStyle = {
      color: "#999",
      fontSize: "90px"
    }
    return(
      <div>
        {props.noResults && <div className="no-results">
          <FontIcon className="fa fa-frown-o" style={iconStyle}/>
          <p>Sorry, no results found</p>
        </div>}
        {props.items.map((item, i) => <ListItem key={i} item={item}/>)}
      </div>
    )
  }

  List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return List;
}

export default ListOf;