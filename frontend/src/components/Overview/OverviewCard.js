import React from 'react';
import './OverviewCard.css'; // We will create this CSS file later

const OverviewCard = ({ title, value, change, currency }) => {
  return (
    <div className="overview-card">
      <h3>{title}</h3>
      <div className="value">{value} {currency}</div>
      <div className={`change ${change >= 0 ? 'positive' : 'negative'}`}>
        {change >= 0 ? `+${change}` : change} {currency}
      </div>
    </div>
  );
};

export default OverviewCard;
