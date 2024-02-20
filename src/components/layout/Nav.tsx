import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

export const Nav = ({ language, setLanguage, translations, loading }: { language: string, setLanguage: any, translations: any, loading: any }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();

  function LanguageSelector() {
    const { i18n } = useTranslation();
    const handleLanguageChange = (event: any) => {
      const newLanguage = event.target.value;
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    };

    return (
      <select
        value={language}
        onChange={handleLanguageChange}
        className="language-selector"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    );
  }

  return (
    <>
      {translations && translations?.navigation && translations?.headers ? (
        loading ? (
          'Loading...'
        ) : (
            <nav className="nav">
              <ul>
                <li className="logo">
                  <div className="play"></div>
                  <div>{t(translations.headers.Title)}</div>
                </li>
                <li>
                  <NavLink to="/home">{t(translations.navigation.Home)}</NavLink>
                </li>
              {!auth?.id && (
                <li>
                  <NavLink to="/login">{t(translations.navigation['Login'])}</NavLink>
                </li>
              )}
              {!auth?.id && (
                <li>
                  <NavLink to="/register">{t(translations.navigation['Register'])}</NavLink>
                </li>
              )}
              {auth?.id && (
                <li>
                  <NavLink to="/categories">
                    {t(translations.navigation.NewTask)}
                  </NavLink>
                </li>
              )}
              {auth?.id && (
                <li>
                  <NavLink to="/tasks">
                    {t(translations.navigation.Tasks)}
                  </NavLink>
                </li>
              )}
              {auth?.id && (
                <li>
                  <NavLink to="/tasks/true">
                    {t(translations.navigation.TasksToDo)}
                  </NavLink>
                </li>
              )}
                <li>
                  <LanguageSelector />
                </li>
                {auth?.id && (
                  <li>
                    <NavLink to="/logout">{t(translations.navigation['Logout'])}</NavLink>
                  </li>
                )}
              </ul>
            </nav>
          )
      ) : ''
      }
    </>
  );
};
