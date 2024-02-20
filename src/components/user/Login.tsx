import { useState } from 'react';
import { Global } from '../../helpers/Globals';
import useAuth from '../../hooks/useAuth';
import { useForm } from '../../hooks/UseForm';
import { useTranslation } from 'react-i18next';

export const Login = ({ translations, loading  }: { translations: any, loading: any  }) => {
  const { form, changed } = useForm({});
  const [logged, setLogged] = useState('not_sended');
  const { auth, setAuth } = useAuth();
  const { t } = useTranslation();

  const loginUser = async (e: any) => {
    e.preventDefault();
    const userToLogin = form;

    const loginUrl = `${Global.url}auth/login/`;
    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify(userToLogin),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const authorizationHeader = response.headers.get('Authorization');
    const token = authorizationHeader?.split(' ')[1]; // Extract the token without the "Bearer " prefix

    if (token) {
      localStorage.setItem('token', token);
    }

    const user = await response.json();
    console.log(user);

  {/* Persist user in browser */}
    if (user) { 
      localStorage.setItem('user', JSON.stringify(user));

      setLogged('logged') ;

    {/* update setAuth */}
      setAuth(user);
      console.log(auth);

    {/* redirect after one second */}
    {/* setTimeout(() => { */}
    {/*    window.location.reload(); */}
    {/*  }, 1000); */}
    } else {
      setLogged('error');
    }
  };

  return (
    <>
      {translations && translations?.register_login ? (
        loading ? (
          'Loading...'
        ) : (
            <>
              <header className="content__header content__header--public">
                <h1 className="content__title">{t(translations.register_login['Login'])}</h1>
              </header>

              <div className="content__posts">
                { logged === 'logged' ? ( <strong className="alert alert-success">User successfully logged!</strong>) : '' }
                { logged === 'error' ? ( <strong className="alert alert-danger">User does not logged!</strong>) : '' }

                <form className='form-login' onSubmit={ loginUser }>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" onChange={ changed } />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">{t(translations.register_login['Password'])}</label>
                    <input type="password" name="password" onChange={ changed } />
                  </div>

                  <input type="submit"
                    className="btn btn-success"
                    value={t(translations.register_login['Enter'])}
                  />
                </form>
              </div>
            </>
          )
      ) : ''
      }
    </>
  )
}
