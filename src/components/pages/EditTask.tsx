import { useEffect, useState } from 'react';
import { RequestAjax } from '../../helpers/RequestAjax';
import { Global } from '../../helpers/Globals';
import { useForm } from '../../hooks/UseForm';
import { useParams } from 'react-router-dom';
import { Priorities } from './Priorities';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';
import { TaskInterface } from '../../helpers/types';
import { useTranslation } from 'react-i18next';

interface Props {
  translations: any
  language: string
}

export const EditTask = ({ translations, language }: Props) => {
  const { t } = useTranslation();
  const [translationsTasks, setTranslationsTasks] = useState(translations);
  const { form, changed } = useForm({});
  const url = Global.url;
  const [result, setResult] = useState('not_sended');
  const [selectedPriority, setSelectedPriority] = useState();
  const [selectedDone, setSelectedDone] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSelected, setDateSelected] = useState(false)
  const [task, setTask] = useState<TaskInterface | null>(null);

  const params = useParams();

  useEffect(() => {
    getTask();
  }, [])

  useEffect(() => {
    setTranslationsTasks(translations);
  }, [translations]);

  const getTask = async () => {
    const url = `${ Global.url }categories/${params.categoryId}/subcategories/${params.subcategoryId}/tasks/${params.id}`;
    const { data } = await RequestAjax( url, 'GET');

    if ( data.status === 'success' ) {
      setTask(data.task);
      setSelectedPriority(data?.task?.priorityId);
      setSelectedDone(data?.task?.done ? 1 : 0);
    }
  };

  const updateTask = async (event: any) => {
    event.preventDefault()

  {/* get data from form */}
    const updatedTask = form;

  {/* save article in backend */}
    const { data } = await RequestAjax( `${url}categories/${params.categoryId}/subcategories/${params.subcategoryId}/tasks/${params.id}`, 'PATCH', updatedTask );

    data.status === 'success' ? setResult('saved') : setResult('error');
  }

{/* react-calendar function and constantes */}
  const formatShortWeekday = (locale: string = 'es-ES', date: Date) => {
    const weekdays = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    return weekdays.format(date);
  };

  const formatMonthYear = (locale: string = 'es-ES', date: Date) => {
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.getFullYear();
    return `${month} - ${year}`;
  };

  const navigationLabel = (props: { date: Date }) => {
    return formatMonthYear('es-ES', props.date);
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleCalendarClick = (event: any) => {
    handleDateChange(event)
    setShowCalendar(false);
    setDateSelected(true)
  };

  const handleDateChange = async (event: any) => {
    const input = document.getElementById("deadline") as HTMLInputElement;
    const formattedDate = moment(event).tz('Europe/Madrid').format('YYYY-MM-DD');
    input.value = formattedDate;
    changed({ target: input });
  };

  const handleClearButtonClick = () => {
    const input = document.getElementById("deadline") as HTMLInputElement;
    input.value = "";
    delete form?.deadline;
    setDateSelected(false)
  };

  // to call more than one function at the same time
  const handlePriorityChangeAndChanged = (event: any) => {
    handlePriorityChange(event);
    changed(event);
  }

  const handlePriorityChange = (event: any) => {
    event.preventDefault();
    setSelectedPriority(event.target.value);
  }

  const handleDoneChangeAndChanged = (event: any) => {
    handleDoneChange(event);
    changed(event);
  }

  const handleDoneChange = (event: any) => {
    event.preventDefault();
    setSelectedDone(event.target.value);
  }

  return (
    <>
      {translationsTasks && translationsTasks?.tasks ? (
        <div className="home">
          <h1>{t(translations.tasks['Update task'])}</h1>

          <strong>{ result === 'saved' ? 'Task updated successfully!' : '' }</strong>
          <strong>{ result === 'error' ? 'The provided data is incorrect!' : '' }</strong>

          <form className='form' onSubmit={ updateTask }>
            <div className="form-group">
              <label htmlFor="task">{t(translations.tasks['Task'])}</label>
              <input type="text" name="task" onChange={ changed } defaultValue={ task?.task } />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">{t(translations.tasks['Deadline'])}</label>
              <div className="input-wrapper">
                <input
                  id="deadline"
                  type="text"
                  name="deadline"
                  onClick={ handleInputClick }
                  readOnly
                  autoComplete="off"
                  defaultValue={ task?.deadline }
                />

                {dateSelected ? (
                  <div className="clear-button" onClick={ handleClearButtonClick }>
                    <img src="/images/deleteButton2.png" alt="Delete input" />
                  </div>
                ) : null}
              </div>

              {showCalendar &&
                <div className="input-wrapper">
                  <div className="close-calendar" onClick={ () => setShowCalendar(false) }>
                    <img src="/images/deleteButton.png" alt="Close calendar" />
                  </div>
                  <Calendar
                    className="react-calendar"
                    onChange={ handleDateChange }
                    value={ new Date()}
                    formatShortWeekday={formatShortWeekday}
                    formatMonthYear={formatMonthYear}
                    showNavigation={true}
                    navigationLabel={navigationLabel}
                    onClickDay={handleCalendarClick}
                  />
                </div>
              }
            </div>

            <div className="form-group">
              <label htmlFor="priority">{t(translations.tasks['Priority'])}</label>
              <Priorities
                onChange={ handlePriorityChangeAndChanged }
                selectedPriority={ selectedPriority }
                translations={ translations }
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">{t(translations.tasks['Comment'])}</label>
              <textarea name="comment" rows={4} cols={40} onChange={ changed } defaultValue={ task?.comment } />
            </div>

            <div className="form-group">
              <label htmlFor="done">{t(translations.tasks['Done'])}</label>
              <select name="done" onChange={ handleDoneChangeAndChanged } value={ selectedDone }>
                <option value={ 0 } >{t(translations.tasks['not done'])} </option>
                <option value={ 1 } >{t(translations.tasks['done'])} </option>
              </select>
            </div>

            <input type="submit"
              className="btn btn-success"
              value={t(translations.tasks['Save'])}
            />
          </form>
        </div>
      ) : ''
      }
    </>
  )
}
