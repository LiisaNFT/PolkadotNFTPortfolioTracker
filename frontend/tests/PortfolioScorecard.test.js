import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PortfolioScorecard from '../src/components/Overview/PortfolioScorecard'; // Adjust the path as needed

describe('PortfolioScorecard', () => {
  it('renders portfolio scorecard correctly', async () => {
    // Render the PortfolioScorecard component
    const { container } = render(<PortfolioScorecard />);

    // Check if the title is rendered correctly
    const titleElement = screen.getByText('Portfolio Scorecard');
    expect(titleElement).toBeInTheDocument();

    // Use waitFor to allow time for asynchronous rendering
    await waitFor(() => {
      // Check if gauge titles are rendered correctly
      const gaugeTitles = container.querySelectorAll('.portfolio-scorecard-title');
      console.log('Gauge titles found:', gaugeTitles.length); // Debug log
      expect(gaugeTitles.length).toBe(3); // Assuming there are three titles
    });
  });
});
