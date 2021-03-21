import * as React from 'react';

import { Timeline } from 'components/timeline';
import { Sidebar } from 'components/sidebar';

function Dashboard() {
  React.useEffect(() => {
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
