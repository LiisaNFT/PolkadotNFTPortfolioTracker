import React from 'react';
import { render } from '@testing-library/react';
import PortfolioEvolution from '../src/components/Overview/PortfolioEvolution';

describe('PortfolioEvolution', () => {
  it('renders portfolio evolution chart correctly', () => {
    // Render the PortfolioEvolution component
    const { container } = render(<PortfolioEvolution />);

    // Check if the title is rendered correctly
    const titleElement = container.querySelector('.portfolio-evolution-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Portfolio Evolution');

    // Check if the LineChart component is rendered
    const lineChartElement = container.querySelector('.recharts-responsive-container');
    expect(lineChartElement).toBeInTheDocument();

    // Check if XAxis and YAxis are rendered
    const xAxisElement = container.querySelector('.recharts-cartesian-axis-tick');
    expect(xAxisElement).toBeInTheDocument();
    const yAxisElement = container.querySelectorAll('.recharts-cartesian-axis-tick');
    expect(yAxisElement.length).toBeGreaterThan(1); // Assuming there are ticks on YAxis

    // Check if Tooltip is rendered
    const tooltipElement = container.querySelector('.recharts-tooltip-wrapper');
    expect(tooltipElement).toBeInTheDocument();
  });
});
