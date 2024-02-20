import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  categoryId: string;
  subcategories: any;
  translations: any
}

export const ShowSubcategories = ({ categoryId, subcategories, translations }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {translations && translations?.subcategories ? (
        <div className="container-subcategories">
          {subcategories.map((subcategory: any) => {
            return (
              <Link key={ subcategory.id } to={`/categories/${categoryId}/subcategories/${subcategory.id}/create-task`} className="mask">
                <div className="subcategory-name">
                  {t(translations.subcategories[subcategory.name])}
                </div>
              </Link>
            )
          })}
        </div>
      ) : ''
      }
    </>
  )
}
