import { useTranslation } from 'react-i18next';

export const Header = ({ translations, loading  }: { translations: any, loading: any  }) => {
  const { t } = useTranslation();

  return (
    <>
      {translations && translations?.headers?.Title ? (
        loading ? (
          'Loading...'
        ) : (
            <header className="header">
              <div className="logo">
                <div className="play"></div>
              </div>

              <h1>
                {t(translations.headers.Title)}
              </h1>
            </header>
          )
      ) : ''
      }
    </>
  )
}
