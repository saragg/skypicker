import React from 'react';
import Navbar from './Navbar';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const tree = renderer.create(
    <MuiThemeProvider>
      <Navbar />
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});