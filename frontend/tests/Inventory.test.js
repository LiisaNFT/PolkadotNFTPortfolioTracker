import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Inventory from '../src/components/Overview/Inventory';

// Mocking the recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="recharts-responsive-container">{children}</div>,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: ({ children, data, label }) => (
    <div>
      {data.map((entry, index) => (
        <div key={`pie-${index}`}>{label(entry)}</div>
      ))}
      {children}
    </div>
  ),
  Cell: () => <div />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe('Inventory Component', () => {
  const sampleData = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 },
    { name: 'Product E', value: 150 },
    { name: 'Product F', value: 120 },
    { name: 'Product G', value: 100 },
    { name: 'Product H', value: 80 },
    { name: 'Product I', value: 50 },
  ];

  it('renders correctly with sample data', async () => {
    render(<Inventory testData={sampleData} />);

    // Check if the inventory title is rendered
    expect(screen.getByText('Inventory')).toBeInTheDocument();

    // Check if the recharts components are rendered
    expect(screen.getByTestId('recharts-responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();

    // Check if each product name and percentage is rendered
    const totalValue = sampleData.reduce((acc, item) => acc + item.value, 0);
    for (const { name, value } of sampleData) {
      const percentage = Math.round((value / totalValue) * 100);
      const text = `${name} (${percentage}%)`;
      await waitFor(() => expect(screen.getByText(text)).toBeInTheDocument());
    }
  });

  it('handles error when fetching data', async () => {
    render(<Inventory testData={null} />);

    // Check if the inventory title is rendered
    expect(screen.getByText('Inventory')).toBeInTheDocument();

    // Wait for the error message to be in the document
    const errorMessageElement = await screen.findByTestId('error-message');
    expect(errorMessageElement).toBeInTheDocument();

    expect(screen.getByText('Error fetching collections: Failed to fetch collections')).toBeInTheDocument();
  });
});

