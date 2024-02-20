import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { ShowTasks } from './ShowTasks';
import { useParams } from 'react-router-dom';

export const Tasks = ({ language, translations  }: { language: string, translations: any  }) => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskDeleted, setTaskDeleted] = useState(true);
  const [todo, setTodo] = useState(false);
  const [changeTodo, setChangeTodo] = useState(false);
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

    const url = params?.todo ? `${Global.url}tasks/true` : `${Global.url}tasks`;

    const { data, charging } = await RequestAjax( url, 'GET', { orderBy }, true );

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
          tasks.length >= 1 ?
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
