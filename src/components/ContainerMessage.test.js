import React from 'react';
import ContainerMessage from './ContainerMessage';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const tree = renderer.create(
    <MuiThemeProvider>
      <ContainerMessage icon="fa fa-smile-o" message="Hi!" />
    </MuiThemeProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});