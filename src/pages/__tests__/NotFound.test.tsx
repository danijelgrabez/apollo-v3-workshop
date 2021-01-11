import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import NotFound from '../NotFound';

describe('NotFound', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<NotFound default />);
  });
});
