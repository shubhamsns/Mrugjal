import { useEffect } from 'react';

import { Sidebar } from 'components/sidebar';
import { Timeline } from 'components/timeline/index';

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - instagram';
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <Timeline />
      <Sidebar />
    </div>
  );
}

export { Dashboard };
