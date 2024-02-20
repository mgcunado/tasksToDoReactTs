import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

export const Sidebar = ({ translations, loading  }: { translations: any, loading: any  }) => {
{/* const [search, setSearch] = useState(''); */}
  const [onlyTaskToDo, setOnlyTaskToDo] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth } = useAuth();

  const makeSearch = (e: any) => {
    e.preventDefault();
    const mySearch = e.target.search_field.value;

    mySearch ?
      navigate(`/search/${onlyTaskToDo}/${mySearch}`, { replace: true })
      : onlyTaskToDo ? 
        navigate('/tasks/true', { replace: true })
        : navigate('/tasks', { replace: true });
  };

  return (
    <>
      {translations && translations?.tasks ? (
        loading ? (
          'Loading...'
        ) : (
            <aside className="sidebar">
              {auth?.id && (
                <div className="search">
                  <h3 className="title">{t(translations.tasks['Searcher'])}</h3>
                  <form onSubmit={ makeSearch }>
                    <input type="text" name="search_field" />
                    <div className="searchInTaskToDo">
                      <input type="checkbox" name="onlyTaskToDo" id="onlyTaskToDo" checked={onlyTaskToDo} onChange={() => setOnlyTaskToDo(!onlyTaskToDo)} />
                      <label htmlFor="onlyTaskToDo">{t(translations.tasks['Only task to do'])}</label>
                    </div>
                    <input type="submit" id="search" value={t(translations.tasks['Search'])} />
                  </form>
                </div>
              )}
              {!auth?.id && (
                <div className="search">
                  <h4>{t(translations.tasks['Please log in to access your tasks to do!'])}</h4>
                  <Link to="/login">
                    <input type="submit"
                      className="btn btn-success"
                      value="Login"
                    />
                  </Link>
                </div>
              )}
            </aside>
          )
      ) : ''
      }
    </>
  )
}

