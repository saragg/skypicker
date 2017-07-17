import React from 'react';
import ListOf from './List';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Renders correctly', () => {

  const ListItem = (props) => {
    return (
      <div>{props.text}</div>
    )
  }

  const items = [
    {
      text: "Item 1"
    }, {
      text: "Item 2"
    }
  ]

  const noResults = false

  const ResultsList = ListOf(ListItem)

  const tree = renderer.create(
    <ResultsList items={items} noResults={noResults}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});