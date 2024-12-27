// import { Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import Header from './componets/Header';

// про дизайн. не связан с данными
function Layout(): JSX.Element {
  return (
    <div className="root-container">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
