import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Globals';
import { useTranslation } from 'react-i18next';

export const Register = ({ translations, loading  }: { translations: any, loading: any  }) => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState('not_sended');
  const { t } = useTranslation();

  const saveUser = async (e: any) => {
    e.preventDefault();
    const newUser = form;

    const registerUrl = `${Global.url}auth/register/`;
    const request = await fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await request.json();

    data.status === 'success' ? setSaved('saved') : setSaved('error');
  };

  return (
    <>
      {translations && translations?.register_login ? (
        loading ? (
          'Loading...'
        ) : (
            <>
              <header className="content__header content__header--public">
                <h1 className="content__title">{t(translations.register_login['Create Account'])}</h1>
              </header>

              <div className="content__posts">
                { saved === 'saved' ? ( <strong className="alert alert-success">User successfully registered!</strong>) : '' }
                { saved === 'error' ? ( <strong className="alert alert-danger">User does not registered!</strong>) : '' }

                <form className='form' onSubmit={ saveUser }>
                  <div className="form-group">
                    <label htmlFor="username">{t(translations.register_login['Username'])}</label>
                    <input type="text" name="username" onChange={ changed } />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={ changed } />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">{t(translations.register_login['Password'])}</label>
                    <input type="password" name="password" onChange={ changed } />
                  </div>

                  <input type="submit"
                    className="btn btn-success"
                    value={t(translations.register_login['Sign Up'])}
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
