import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const PublicLayout = () => {
  const { auth } = useAuth();

    return (
    <>
      {/* Main content */}
      <section className="layout__content">
        { !auth?.id ?
          <Outlet />
          :
          <Navigate to="/tasks/:todo?" />
        }
      </section>
    </>
    )
}
