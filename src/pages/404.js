import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = 'Not found - Mrugjal';
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found</p>
      </div>
    </div>
  );
}

export { NotFound };
