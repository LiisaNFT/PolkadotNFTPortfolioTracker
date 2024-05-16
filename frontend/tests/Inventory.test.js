import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Inventory from '../src/components/Overview/Inventory';

describe('Inventory', () => {
  const mockData = [
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

  it('renders correctly with mock data', async () => {
    const { getByText, getByTestId, container } = render(
      <Inventory testData={mockData} />
    );

    // Wait for the Inventory title to be in the document
    await waitFor(() => {
      expect(getByText('Inventory')).toBeInTheDocument();
    });

    // Output the container HTML for debugging
    console.log(container.innerHTML);

    // Wait for the PieChart to be in the document
    await waitFor(() => {
      expect(getByTestId('pie-chart')).toBeInTheDocument();
    });

    // Check if each product name is rendered with its corresponding value
    mockData.forEach(({ name, value }) => {
      const percentage = Math.round((value / mockData.reduce((acc, item) => acc + item.value, 0)) * 100);
      expect(getByText(`${name} (${percentage}%)`)).toBeInTheDocument();
    });
  });

  it('handles error when fetching data', async () => {
    const { getByText } = render(
      <Inventory testData={null} />
    );

    // Wait for the error message to be in the document
    await waitFor(() => {
      expect(getByText('Error fetching collections: Failed to fetch collections')).toBeInTheDocument();
    });
  });
});

