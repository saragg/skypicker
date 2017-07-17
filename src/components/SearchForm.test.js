import React from 'react';
import SearchForm from './SearchForm';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const searchFlights = () => {
    return;
  }

  const tree = renderer.create(
    <MuiThemeProvider>
      <SearchForm searchFlights={searchFlights}/>
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});