import React from 'react';
import { render } from '@testing-library/react';
import RecentlyBought from './RecentlyBought';

describe('RecentlyBought', () => {
  it('renders recently bought items correctly', () => {
    // Render the RecentlyBought component
    const { container, getByText } = render(<RecentlyBought />);

    // Check if the title is rendered correctly
    const titleElement = getByText('Recently Bought');
    expect(titleElement).toBeInTheDocument();

    // Check if each recently bought item is rendered correctly
    const collectionItems = container.querySelectorAll('.collection-item');
    expect(collectionItems.length).toBe(5); // Assuming there are 5 recently bought items

    // Check if each item's name and change are rendered correctly
    const itemNames = ['Ethereum', 'Bitcoin', 'Cardano', 'Solana', 'Polkadot'];
    const itemChanges = ['+35%', '-7%', '+15%', '-2%', '+22%'];
    collectionItems.forEach((item, index) => {
      const nameElement = item.querySelector('.name');
      expect(nameElement.textContent).toBe(itemNames[index]);

      const changeElement = item.querySelector('.change');
      expect(changeElement.textContent).toBe(itemChanges[index]);
    });
  });
});
