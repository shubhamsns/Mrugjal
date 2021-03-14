import { Link } from 'react-router-dom';

function Header() {
  // 3:30
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link aria-label="instagram logo " to="/dashboard">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2  w-6/12"
                />
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
