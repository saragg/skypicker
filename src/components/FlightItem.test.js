import React from 'react';
import FlightItem from './FlightItem';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {
  const item = {
    cityFrom: "Barcelona",
    flyFrom: "Tokio",
    countryFrom: {
      code: 'ES',
    },
    countryTo: {
      code: 'JP',
    },
    route: [],
    fly_duration: "18h 30m",
    return_duration: "20h 45m",
    nightsInDest: 3,
    price: 170,
  }

  const tree = renderer.create(
    <MuiThemeProvider>
      <FlightItem item={item}/>
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});