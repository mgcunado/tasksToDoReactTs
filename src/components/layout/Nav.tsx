import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Nav = ({ language, setLanguage, translations, loading  }: { language: string, setLanguage: any, translations: any, loading: any  }) => {
  const { t } = useTranslation();

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
      {translations && translations?.navigation?.Home ? (
        loading ? (
          'Loading...'
        ) : (
            <nav className="nav">
              <ul>
                <li>
                  <NavLink to="/home">{t(translations.navigation.Home)}</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">
                    {t(translations.navigation.NewTask)}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tasks">{t(translations.navigation.Tasks)}</NavLink>
                </li>
                <li>
                  <NavLink to="/tasks/true">
                    {t(translations.navigation.TasksToDo)}
                  </NavLink>
                </li>
                <li>
                  <LanguageSelector />
                </li>
              </ul>
            </nav>
          )
      ) : ''
      }
    </>
  );
};
