import { createContext, useEffect, useState } from 'react';
import { Global } from '../helpers/Globals';

interface Auth {
  id?: string;
}

const AuthContext = createContext<{
  auth: Auth;
  setAuth: (auth: Auth) => void;
  loading: boolean;
}>({
  auth: { id: '' },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {},
  loading: true
});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    {/* get logged user from localStorage */}
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    {/* check token and user */}
    if ( !token || !user ) {
      setLoading(false);
      return false
    }

    {/* transform from data to js object */}
    {/* const userObject = JSON.parse(user); */}
    {/* const userId = userObject.id; */}

    {/* check token by ajax request to backend, then return user data */}
    const urlProfile = `${Global.url}auth/me`;
    {/* const urlProfile = `${Global.url}user/profile/${userId}`; */}
    const request = await fetch(urlProfile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await request.json();

    {/* update setAuth and setCounters */}
    setAuth(data);
    {/* setCounters(dataCounters); */}
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value = {{
        auth,
        setAuth,
        loading
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;
