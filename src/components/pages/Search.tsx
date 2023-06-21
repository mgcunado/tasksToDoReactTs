import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { useParams } from 'react-router-dom';
import { ShowTasks } from './ShowTasks';

interface Props {
  translations: any
  language: string
}

export const Search = ({ translations, language }: Props) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskDeleted, setTaskDeleted] = useState(true);
  const [changeTodo, setChangeTodo] = useState(false);
  const [todo, setTodo] = useState(false);
  const [order, setOrder] = useState({ task: 'ASC'});
  const [changeOrder, setChangeOrder] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params?.todo) {
      todo === false ? setChangeTodo(true) : ''
      setTodo(true);
    } else {
      todo === true ? setChangeTodo(true) : ''
      setTodo(false);
    }
    changeOrder === false ? setChangeOrder(true) : ''
    getTasks();
  }, [tasks, params, todo, order]);

  const getTasks = async () => {
    const orderBy= order

    const url = params?.todo === 'true' ? `${Global.url}search/true/${params.search}` : `${Global.url}search/false/${params.search}`;
    const { data, charging } = await RequestAjax( url, 'GET', { orderBy } );

    if ( data.status === 'success' && ( taskDeleted || changeTodo || changeOrder ) ) {
      setTaskDeleted(false);
      setTasks(data.tasks);
      setLoading(charging);
      setChangeTodo(false);
      setChangeOrder(false);
    }
  };

  return (
    <>
      { loading ? 'Loading...' :
          tasks?.length >= 1 ? 
          <ShowTasks  
            tasks = { tasks }
            setTasks = { setTasks }
            setTaskDeleted = { setTaskDeleted }
            setOrder = { setOrder }
            translations = { translations }
            language={language}
          />
          : <h1>There is not tasks</h1>
      }
    </>
  )
}
