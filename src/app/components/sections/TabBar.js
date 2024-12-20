import React from 'react';
import { TabsList, TabsTrigger } from '../ui/tabs';

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'time', label: 'Time' },
  { value: 'content', label: 'Content' },
  { value: 'themes', label: 'Themes' },
  { value: 'sentiment', label: 'Sentiment' },
  { value: 'growth', label: 'Growth' },
];

const TabBar = () => {
  return (
    <div className="sticky top-0 z-10 bg-slate-900 pb-4">
      <TabsList className="grid w-full grid-cols-6">
        {TABS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default TabBar;