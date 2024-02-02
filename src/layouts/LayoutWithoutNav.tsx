import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { checkAuthContext } from '../context/CheckAuthProvider';

function LayoutWithoutNav() {
  const { userIsLoggedIn } = useContext(checkAuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    if (
      (!userIsLoggedIn && location.pathname !== '/') ||
      (!userIsLoggedIn && location.pathname == '/register')
    ) {
      navigate(location.pathname === '/' ? '/' : '/register');
    }
  }, []);
  return (
    <main className="h-full">
      <Outlet />
    </main>
  );
}

export default LayoutWithoutNav;
