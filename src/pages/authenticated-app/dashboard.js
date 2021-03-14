import { useEffect } from 'react';

import { Header } from 'components/header';
import { Sidebar } from 'components/sidebar';
import { Timeline } from 'components/timeline';

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - instagram';
  });
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Sidebar />
        <Timeline />
      </div>
    </div>
  );
}

export { Dashboard };
