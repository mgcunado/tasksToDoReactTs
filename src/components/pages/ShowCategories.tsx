import { Global } from '../../helpers/Globals';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ShowCategories = ({ categories, translations  }: { categories: any, translations: any  }) => {
  const { t } = useTranslation();

  return (
    <>
      {translations && translations?.categories?.home ? (
        <div className="container-categories">
          {categories.map((category: any) => {
            return (
              <Link key={ category.id } to={`/categories/${category.id}/subcategories`} className="mask">
                { category.image === 'default-category.png' &&
                  <img src={ `${Global.frontendUrl}images/gato1.jpeg` } alt="gato" />
                }
                { category.image !== 'default-category.png' &&
                  <img src={ `${Global.frontendUrl}images/${category.image}` } alt="" />
                }
                <h3 className="title">
                  {t(translations.categories[category.name])}
                </h3>
              </Link>
            )
          })}
        </div>
      ) : ''
      }
    </>
  )
}
