import React from 'react';
import OverviewCard from './OverviewCard';
import './OverviewBlock.css'; 

const OverviewBlock = () => {
  return (
    <div className="overview-block">
      <OverviewCard title="Estimated Value" value="749" change={11.19} currency="GLMR" />
      <OverviewCard title="Revenue" value="1194" change={8.41} currency="GLMR" />
      <OverviewCard title="Spending" value="749" change={-11.19} currency="GLMR" />
      <OverviewCard title="Realized PnL" value="1194" change={8.41} currency="GLMR" />
      <OverviewCard title="Unrealized PnL" value="749" change={11.19} currency="GLMR" />
    </div>
  );
};

export default OverviewBlock;
