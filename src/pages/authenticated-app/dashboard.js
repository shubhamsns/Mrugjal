import { useEffect } from 'react';

import { Sidebar } from 'components/sidebar';
import { Timeline } from 'components/timeline/index';

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - instagram';
  }, []);

  return (
    <div className="container flex justify-center lg:grid lg:grid-cols-3 lg:gap-4 lg:justify-between mx-auto max-w-screen-lg px-3">
      <Timeline />
      <Sidebar />
    </div>
  );
}

export { Dashboard };
