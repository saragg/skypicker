import React from 'react';
import SearchPage from './SearchPage';
import ShallowRenderer from 'react-test-renderer/shallow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const renderer = new ShallowRenderer();
  const tree = renderer.render(
     <SearchPage />
  );

  expect(tree).toMatchSnapshot();
});