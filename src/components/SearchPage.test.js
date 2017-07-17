import React from 'react';
import SearchPage from './SearchPage';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const searchFlights = () => {
    return;
  }

  const tree = renderer.create(
    <MuiThemeProvider>
      <SearchPage />
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});