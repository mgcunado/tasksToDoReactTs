import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TaskInterface } from '../../helpers/types';
import { bgColors, colors, fontWeights } from '../../helpers/Constants';
import ReactTimeAgo from 'react-time-ago';
import { DeleteConfirmModal } from '../modals/deleteConfirmModal';
import { useTranslation } from 'react-i18next';

interface Props {
  translations: any
  language: string
}

export const Task = ({ translations, language }: Props) => {
  const [task, setTask] = useState<TaskInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    getTask();
  }, [])

  const getTask = async () => {
    const url = `${ Global.url }categories/${params.categoryId}/subcategories/${params.subcategoryId}/tasks/${params.id}`;
    const { data, charging } = await RequestAjax( url, 'GET', '', true);

    if ( data.status === 'success' ) {
      setTask(data.task);
      setLoading(charging);
    }
  };

  const deleteTask = async (categoryId: any, subcategoryId: any, id: any) => {
    const { data } = await RequestAjax(`${Global.url}categories/${categoryId}/subcategories/${subcategoryId}/tasks/${id}`, 'DELETE', '', true);

    if ( data.status === 'success' ) {
      setShowModal(false);
      navigate('/tasks');
    }
  };

  return (
    <>
      { task && task?.task?.length >= 1 ?
        loading ? 'Loading...' :
          (
            <div className="container-task">
              <h3>{ task.task }</h3>
              <div className="task-priority-deadline"
                style={{
                  color: colors[task.priority.id] ,
                  backgroundColor: bgColors[task.priority.id],
                  fontWeight: fontWeights[task.priority.id]
                }}
              >
                {t(translations.tasks['Priority'])}: {t(translations.priority[task.priority.level])}
              </div>
              <div className="task-priority-deadline">
                {t(translations.tasks['Subcategory'])}: {t(translations.subcategories[task.subcategory.name])}
              </div>
              <div className="task-priority-deadline">
                {t(translations.tasks['Deadline'])}: <ReactTimeAgo date={ new Date(task.deadline) } locale={ language }/>
              </div>
              { task.comment ?
                (
                  <div className="task-priority-deadline">
                    {t(translations.tasks['Comment'])}: { task.comment }
                  </div>
                ) : ''
              }
              <div className="task-edit-delete">
                <Link
                  to={`/categories/${task.subcategory.categoryId}/subcategories/${task.subcategory.id}/edit-task/${task.id}`}
                >
                  <img src="/images/editButton.png" alt="Edit task" />
                </Link>
                <Link
                  to={`/categories/${task.subcategory.categoryId}/subcategories/${task.subcategory.id}/tasks/${task.id}`}
                  onClick={() => {
                    if (!showModal) {
                      setShowModal(true);
                    }
                  }}
                >
                  <img src="/images/trash.png" alt="Delete task" />
                </Link>
                <DeleteConfirmModal
                  message={ `¿ ${t(translations.tasks['Are you sure you want to delete the task'])} "${ task?.task }" ?` }
                  onConfirm={() => { deleteTask(task.subcategory.categoryId, task.subcategory.id, task.id) }}
                  onCancel={() => setShowModal(false)}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  translations={translations}
                />
              </div>
            </div>
          )
        : <h1>There is not task</h1>
      }
    </>
  )
}
