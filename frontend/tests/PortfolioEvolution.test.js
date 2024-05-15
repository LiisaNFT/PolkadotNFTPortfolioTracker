import React from 'react';
import { render, waitFor } from '@testing-library/react';
import PortfolioEvolution from '../src/components/Overview/PortfolioEvolution';

// Mock the Recharts library
jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => <div className="recharts-responsive-container">{children}</div>,
    LineChart: ({ children }) => <div className="line-chart">{children}</div>,
    Line: () => <div className="line" />,
    XAxis: () => <div className="x-axis" />,
    YAxis: () => <div className="y-axis" />,
    Tooltip: () => <div className="tooltip" />,
  };
});

describe('PortfolioEvolution', () => {
  it('renders portfolio evolution chart correctly', async () => {
    // Render the PortfolioEvolution component
    const { container } = render(<PortfolioEvolution />);

    // Wait for the chart to render
    await waitFor(() => {
      const xAxisElement = container.querySelector('.x-axis');
      expect(xAxisElement).toBeInTheDocument();

      const yAxisElements = container.querySelectorAll('.y-axis');
      expect(yAxisElements.length).toBeGreaterThan(0); // Ensure YAxis is present
    }, { timeout: 3000 });
  });
});
