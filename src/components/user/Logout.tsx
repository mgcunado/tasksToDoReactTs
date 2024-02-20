import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
  {/* empty the localStorage */}
    localStorage.clear();

  {/* set global states to empty */}
    setAuth({});

  {/* redirect to login */}
    navigate('/login')
  })

  return (
    <h1>Closing session...</h1>
  )
}

