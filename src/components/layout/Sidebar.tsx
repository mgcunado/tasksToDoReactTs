import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Sidebar = ({ translations, loading  }: { translations: any, loading: any  }) => {
{/* const [search, setSearch] = useState(''); */}
  const [onlyTaskToDo, setOnlyTaskToDo] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            </aside>
          )
      ) : ''
      }
    </>
  )
}

