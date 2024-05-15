import React from 'react';
import { render } from '@testing-library/react';
import TopLosers from '../src/components/Overview/tops/TopLosers';

describe('TopLosers', () => {
  it('renders top losers correctly', () => {
    // Render the TopLosers component
    const { container, getByText } = render(<TopLosers />);

    // Check if the title is rendered correctly
    const titleElement = getByText('Top Losers');
    expect(titleElement).toBeInTheDocument();

    // Check if each top loser item is rendered correctly
    const collectionItems = container.querySelectorAll('.collection-item');
    expect(collectionItems.length).toBe(5); // Assuming there are 5 top losers

    // Check if each item's name and change are rendered correctly
    const itemNames = ['Sushiswap', 'Compound', 'Yearn.finance', 'Maker', 'Algorand'];
    const itemChanges = ['-10%', '-8%', '-5%', '-4%', '-3%'];
    collectionItems.forEach((item, index) => {
      const nameElement = item.querySelector('.name');
      expect(nameElement.textContent).toBe(itemNames[index]);

      const changeElement = item.querySelector('.change');
      expect(changeElement.textContent).toBe(itemChanges[index]);
    });
  });
});
