import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { Link } from 'react-router-dom';
import { bgColors, colors, fontWeights } from '../../helpers/Constants';
import { useState } from 'react';
import { DeleteConfirmModal } from '../modals/deleteConfirmModal';
import { TaskInterface } from '../../helpers/types';
import ReactTimeAgo from 'react-time-ago';
import { useTranslation } from 'react-i18next';

interface Props {
  tasks: any;
  setTasks: any;
  setTaskDeleted: any;
  setOrder: any;
  translations: any
  language: string
}

export const ShowTasks = ({ tasks, setTasks, setTaskDeleted, setOrder, translations, language }: Props) => {
  const [activeOrder, setActiveOrder] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [putTask, setPutTask] = useState<TaskInterface | null>(null);
  const { t } = useTranslation();

  const deleteTask = async (categoryId: any, subcategoryId: any, id: any) => {
    const { data } = await RequestAjax(`${Global.url}categories/${categoryId}/subcategories/${subcategoryId}/tasks/${id}`, 'DELETE');

    if ( data.status === 'success' ) {
      const taskListUpdated = await tasks.filter((task: any) => task.id !== id );
      await setTaskDeleted(true);
      await setTasks(taskListUpdated);
    }
  };

  const taskDone = async (categoryId: any, subcategoryId: any, id: any, done: boolean ) => {
    const { data } = await RequestAjax(`${Global.url}categories/${categoryId}/subcategories/${subcategoryId}/tasks/${id}`, 'PATCH', { done: done });

    if ( data.status === 'success' ) {
      const taskListUpdated = await tasks.filter((task: any) => task.id !== id );
      await setTaskDeleted(true);
      await setTasks(taskListUpdated);
    }
  };

  const handleClick = (field: string) => {
    setActiveOrder(field);
    setOrder((order: any) => ({ [field]: order[field] === 'ASC' ? 'DESC' : 'ASC' }))
  }

  return (
    <>
      {translations && translations?.tasks ? (
        <div className="container-tasks">
          <div className="task task-header">
            <div
              className={`task-task ${activeOrder === 'task' ? 'order-active' : ''}`}
              onClick={() => handleClick('task')}
            >
              {t(translations.tasks['Task'])}
              <img src="/images/orderby2.png" alt="Order by this" />

            </div>
            <div
              className={`task-subcategory ${activeOrder === 'subcategoryId' ? 'order-active' : ''}`}
              onClick={() => handleClick('subcategoryId')}
            >
              {t(translations.tasks['Subcategory'])}
              <img src="/images/orderby2.png" alt="Order by this" />
            </div>
            <div
              className={`task-priority ${activeOrder === 'priorityId' ? 'order-active' : ''}`}
              onClick={() => handleClick('priorityId')}
            >
              {t(translations.tasks['Priority'])}
              <img src="/images/orderby2.png" alt="Order by this" />
            </div>
            <div
              className={`task-deadline ${activeOrder === 'deadline' ? 'order-active' : ''}`}
              onClick={() => handleClick('deadline')}
            >
              {t(translations.tasks['Deadline'])}
              <img src="/images/orderby2.png" alt="Order by this" />
            </div>
            <div className="task-edit"> {t(translations.tasks['Edit'])}</div>
            <div className="task-edit"> {t(translations.tasks['Delete'])}</div>
            <div
              className={`task-done-header ${activeOrder === 'done' ? 'order-active' : ''}`}
              onClick={() => handleClick('done')}
            >
              {t(translations.tasks['Done'])}
              <img src="/images/orderby2.png" alt="Order by this" />
            </div>
          </div>
          {tasks.map((task: any) => {
            return (
              <div
                key={ task.id }
                className="task"
                style={{
                  backgroundColor: bgColors[task.priority.id],
                  fontWeight: fontWeights[task.priority.id]
                }}
              >
                <div className="task-task">
                  <Link
                    to={`/categories/${task.subcategory.categoryId}/subcategories/${task.subcategory.id}/tasks/${task.id}`}
                    className="task-task-link"
                    style={{
                      color: colors[task.priority.id],
                    }}
                  >
                    { task.task }
                  </Link>
                </div>
                <div className="task-subcategory" style={{ color: colors[task.priority.id] }} >
                  {t(translations.subcategories[task.subcategory.name])}
                </div>
                <div className="task-priority" style={{ color: colors[task.priority.id] }} >
                  {t(translations.priority[task.priority.level])}
                </div>
                <div className="task-deadline" style={{ color: colors[task.priority.id] }} >
                  <ReactTimeAgo date={ new Date(task.deadline) } locale={ language }/>
                </div>
                <div className="task-edit" >
                  <Link
                    to={`/categories/${task.subcategory.categoryId}/subcategories/${task.subcategory.id}/edit-task/${task.id}`}
                    className="task-task-link"
                    style={{
                      color: colors[task.priority.id],
                    }}
                  >
                    <img src="/images/editButton.png" alt="Edit task" />
                  </Link>
                </div>
                <div
                  className="task-delete"
                  onClick={() => {
                    if (!showModal) {
                      setShowModal(true);
                      setPutTask(task);
                    }
                  }}
                >
                  <img src="/images/trash.png" alt="Delete task" />
                </div>
                <DeleteConfirmModal
                  message={ `¿ ${t(translations.tasks['Are you sure you want to delete the task'])} "${ putTask?.task }" ?` }
                  onConfirm={() => { deleteTask(task.subcategory.categoryId, task.subcategory.id, putTask?.id) }}
                  onCancel={() => setShowModal(false)}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  translations={translations}
                />
                <div
                  className="task-done"
                  onClick={() => { taskDone(task.subcategory.categoryId, task.subcategory.id, task.id, !task.done ) }}
                >
                  <img
                    src={task.done ? "/images/doneTrue.png" : "/images/doneButton.png"}
                    alt="Done button"
                  />
                </div>
              </div>
            )
          })}
        </div>
      ) : ''
      }
    </>
  )
}
