import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { ShowSubcategories } from './ShowSubcategories';
import { useParams } from 'react-router-dom';

export const Subcategories = ({ translations  }: { translations: any  }) => {
  const [categoryId, setCategoryId] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getSubcategories();
  }, [])

  const getSubcategories = async () => {
    const url = `${ Global.url }categories/${params.categoryId}/subcategories`;
    const { data, charging } = await RequestAjax( url, 'GET', '', true);

    if ( data.status === 'success' ) {
      params.categoryId ? setCategoryId(params.categoryId) : ''
      setSubcategories(data.subcategories);
      setLoading(charging);
    }
  };

  return (
    <>
      { loading ? 'Loading...' :
          subcategories.length >= 1 ? 
          <ShowSubcategories 
            categoryId = { categoryId }
            subcategories = { subcategories }
            translations = { translations }
          />
          : ''
      }
    </>
  )
}


