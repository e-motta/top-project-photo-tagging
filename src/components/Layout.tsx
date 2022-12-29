import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <div className="m-auto max-w-[1750px]">
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
