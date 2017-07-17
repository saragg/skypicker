import React from 'react';
import Route from './FlightItemRoute';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {
  const route = {
    cityFrom: "Barcelona",
    flyFrom: "Tokio",
    countryFrom: {
      code: 'ES',
    },
    countryTo: {
      code: 'JP',
    },
    fly_duration: "18h 30m",
    return_duration: "20h 45m",
    nightsInDest: 3,
    price: 170,
  }

  const tree = renderer.create(
    <MuiThemeProvider>
      <Route route={route}/>
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});