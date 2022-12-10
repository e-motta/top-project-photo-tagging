import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;
