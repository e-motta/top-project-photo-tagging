import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
