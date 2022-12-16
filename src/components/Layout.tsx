import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="overflow-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
