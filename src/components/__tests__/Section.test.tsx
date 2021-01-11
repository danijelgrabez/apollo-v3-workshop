import React from 'react';
import { render, cleanup } from '../../utils/test-utils';
import Section from '../Section';

describe('Section', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    render(<Section>Hello World</Section>);
  });
});
