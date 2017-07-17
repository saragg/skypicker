import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import ContainerMessage from './ContainerMessage';

const ListOf = (ListItem) => {

  const List = (props) => {
    const iconStyle = {
      color: "#999",
      fontSize: "90px"
    }
    return(
      <div>
        {props.noResults && <ContainerMessage
          icon="fa fa-frown-o"
          message="Sorry, no results found"/>
        }
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