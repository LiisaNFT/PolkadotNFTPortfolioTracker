import React from 'react';
import { render } from '@testing-library/react';
import PortfolioScorecard from '../src/components/Overview/PortfolioScorecard';

describe('PortfolioScorecard', () => {
  it('renders portfolio scorecard correctly', () => {
    // Render the PortfolioScorecard component
    const { container, getByText } = render(<PortfolioScorecard />);

    // Check if the title is rendered correctly
    const titleElement = getByText('Portfolio Scorecard');
    expect(titleElement).toBeInTheDocument();

    // Check if each gauge is rendered correctly
    const gauges = container.querySelectorAll('.recharts-wrapper');
    expect(gauges.length).toBe(3); // Assuming there are three gauges

    // Check if gauge titles are rendered correctly
    const gaugeTitles = container.querySelectorAll('.portfolio-scorecard-title');
    expect(gaugeTitles.length).toBe(3); // Assuming there are three gauge titles

    // Check if gauge values are rendered correctly
    const gaugeValues = container.querySelectorAll('.portfolio-scorecard-value');
    expect(gaugeValues.length).toBe(3); // Assuming there are three gauge values
  });
});
