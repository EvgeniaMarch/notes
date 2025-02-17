import { Outlet } from 'react-router-dom';
import NavBar from './features/navBar/NavBar';

// про дизайн. не связан с данными
function Layout(): JSX.Element {
  return (
    <div className="root-container">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
