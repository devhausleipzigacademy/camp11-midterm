import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useContext, useEffect } from 'react';
import { checkAuthContext } from '../context/CheckAuthProvider';

function NavbarLayout() {
  const { userIsLoggedIn } = useContext(checkAuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="flex justify-center">
        <NavBar />
      </footer>
    </>
  );
}

export default NavbarLayout;
