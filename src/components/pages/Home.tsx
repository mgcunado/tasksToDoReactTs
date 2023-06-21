import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const Home = ({ translations  }: { translations: any  }) => {
  const [translationsTasks, setTranslationsTasks] = useState(translations);
  const { t } = useTranslation();

  useEffect(() => {
    setTranslationsTasks(translations);
  }, [translations]);

  return (
    <>
      {translationsTasks && translationsTasks?.tasks ? (
        <div className="home">
          <h1>
            {t(translations.tasks['Wellcome to My Tasks to do'])}
          </h1>
          <p>
            {t(translations.tasks['We can create tasks we must do in the future.'])}
          </p>
          <p>
            {t(translations.tasks['We can also see, order, edit and delete them.'])}
          </p>
          <Link to="/tasks" className="button">
            {t(translations.tasks['See The Tasks'])}
          </Link>
        </div>
      ) : ''
      }
    </>
  )
}

