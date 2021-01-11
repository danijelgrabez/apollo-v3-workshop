import React from 'react';
import { screen, renderApollo, cleanup, user, waitFor } from '../../utils/test-utils';
import { cache, setTheme } from '../../cache';
import ThemeConfig from '../ThemeConfig';

describe('Theme Config', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    renderApollo(
      <ThemeConfig>
        <h1>Hello World</h1>
      </ThemeConfig>,
      { cache }
    );
  });

  it('theme switcher (LIGHT → DARK)', async () => {
    // Initial render
    expect(setTheme()).toBe('LIGHT');
    renderApollo(
      <ThemeConfig>
        <h1>Hello World</h1>
      </ThemeConfig>,
      { cache }
    );

    // Interaction
    const button = screen.getByTestId(/toggle-theme/i);
    user.click(button);
    await waitFor(() => {
      expect(setTheme()).toBe('DARK');
    });
  });

  it('theme switcher (DARK → LIGHT)', async () => {
    // Initial render
    expect(setTheme()).toBe('DARK');
    renderApollo(
      <ThemeConfig>
        <h1>Hello World</h1>
      </ThemeConfig>,
      { cache }
    );

    // Interaction
    const button = screen.getByTestId(/toggle-theme/i);
    user.click(button);
    await waitFor(() => {
      expect(setTheme()).toBe('LIGHT');
    });
  });
});
