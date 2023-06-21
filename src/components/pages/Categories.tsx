import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { ShowCategories } from './ShowCategories';

export const Categories = ({ translations  }: { translations: any  }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    const url = `${ Global.url }categories`;
    const { data, charging } = await RequestAjax( url, 'GET');

    if ( data.status === 'success' ) {
      setCategories(data.categories);
      setLoading(charging);
    }
  };

  return (
    <>
      { loading ? 'Loading...' :
          categories.length >= 1 ? 
          <ShowCategories 
            categories = { categories }
            translations = { translations }
          />
          : ''
      }
    </>
  )
}
