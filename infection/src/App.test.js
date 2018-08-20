import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Welcome from './views/login/welcome';
import Game from './components/game';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should render Welcome if not logged in', () => {
  const appNotLoggedIn = renderer
    .create(<Welcome></Welcome>)
    .toJSON();
  expect(appNotLoggedIn).toMatchSnapshot();
});

test('should render Game if logged in', () => {
  const appLoggedIn = renderer.create(<App/>);
  appLoggedIn.getInstance().login();
  renderer
    .create(<Game></Game>)
    .toJSON();
  expect(appLoggedIn).toMatchSnapshot();
});