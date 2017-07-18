import React from 'react';
import SearchForm from './SearchForm';
import ShallowRenderer from 'react-test-renderer/shallow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const searchFlights = () => {
    return;
  }

  const renderer = new ShallowRenderer();

  const tree = renderer.render(
    <SearchForm searchFlights={searchFlights}/>
  );

  expect(tree).toMatchSnapshot();
});