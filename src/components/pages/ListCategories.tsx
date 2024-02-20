import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { Link } from 'react-router-dom';

interface Props {
  categories: any;
  setCategories: any;
}

export const ListCategories = ({ categories, setCategories }: Props) => {
  const deleteCategory = async (id: number) => {
     const { data } = await RequestAjax(`${Global.url}category/${id}`, 'DELETE', '', true);

    if ( data.status === 'success' ) {
      const categoryListUpdated = categories.filter((category: any) => category._id !== id );
      setCategories(categoryListUpdated);
    }
   };

  return (
    categories.map((category: any) => {
      return (
        <article key={ category.id } className="category-item">
          <div className="mask">
            { category.image === 'default-category.png' &&
              <img src={ `${Global.frontendUrl}images/gato1.jpeg` } alt="gato" />
            }
            { category.image !== 'default-category.png' &&
              <img src={ `${Global.url}image/${category.image}` } alt="" />
            }
          </div>
          <div className="data">
            <h3 className="title">
              <Link to={ `/category/${category._id}`}>
              { category.name }
              </Link>
            </h3>
            <p className="description">{ category.status }</p>

            <Link to={`/update/${category._id}`} className="edit">Editar</Link>
            <button className="delete"
              onClick={() => {
                 deleteCategory(category._id)
               }}
            >Borrar</button>
          </div>
        </article>
      )
    })
  )
}

