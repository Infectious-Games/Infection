import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Welcome from '../../views/login/welcome';;

test('should render Welcome', () => {
  const welcome = renderer
    .create(<Welcome></Welcome>)
    .toJSON();
  expect(welcome).toMatchSnapshot();
});