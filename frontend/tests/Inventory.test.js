// Inventory.test.js

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Inventory from '../src/components/Overview/Inventory';

describe('Inventory', () => {
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

    // Wait for the Inventory title to be in the document
    await waitFor(() => {
      expect(screen.getByText('Inventory')).toBeInTheDocument();
    });

    // Wait for the ResponsiveContainer to be in the document
    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });

    // Wait for the PieChart to be in the document
    await waitFor(() => {
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    // Check if each product name is rendered within the PieChart
    for (const { name } of sampleData) {
      const productElement = await screen.findByText(name);
      expect(productElement).toBeInTheDocument();
    }

    // Check if each product percentage is rendered
    const totalValue = sampleData.reduce((acc, item) => acc + item.value, 0);
    for (const { name, value } of sampleData) {
      const percentage = Math.round((value / totalValue) * 100);
      const text = `${percentage}%`;
      const percentageElement = screen.getByText(text);
      expect(percentageElement).toBeInTheDocument();
    }
  });
});
