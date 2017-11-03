import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

it('renders without crashing', () => {
  const wrapper = renderer.create(<App />).toJSON();

  expect(wrapper).toBeTruthy();
});
