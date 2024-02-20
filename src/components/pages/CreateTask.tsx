import { useEffect, useState } from 'react';
import { RequestAjax } from '../../helpers/RequestAjax';
import { Global } from '../../helpers/Globals';
import { useForm } from '../../hooks/UseForm';
import { useParams } from 'react-router-dom';
import { Priorities } from './Priorities';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

interface Props {
  translations: any
  language: string
}

export const CreateTask = ({ translations, language }: Props) => {
  const { t } = useTranslation();
  const [translationsTasks, setTranslationsTasks] = useState(translations);
  const { form, changed } = useForm({});
  const url = Global.url;
  const [result, setResult] = useState('not_sended');
  const [selectedPriority, setSelectedPriority] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateSelected, setDateSelected] = useState(false)

  useEffect(() => {
    setTranslationsTasks(translations);
  }, [translations]);

{/* react-calendar function and constantes */}
  const formatShortWeekday = (locale: string = language, date: Date) => {
    const weekdays = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    return weekdays.format(date);
  };

  const formatMonthYear = (locale: string = language, date: Date) => {
    const month = date.toLocaleString(locale, { month: 'long' });
    const year = date.getFullYear();
    return `${month} - ${year}`;
  };

  const navigationLabel = (props: { date: Date }) => {
    return formatMonthYear(language, props.date);
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

  const params = useParams();

  // to call more than one function at the same time
  const handlePriorityChangeAndChanged = (event: any) => {
    handlePriorityChange(event);
    changed(event);
  }

  const handlePriorityChange = (event: any) => {
    event.preventDefault();
    setSelectedPriority(event.target.value);
  }

  const saveTask = async (e: any) => {
    e.preventDefault();

  {/* get data from form */}
    const newTask = form;

  {/* save article in backend */}
    const { data } = await RequestAjax( `${url}categories/${params.categoryId}/subcategories/${params.subcategoryId}/tasks/`, 'POST', newTask, true );

    data.status === 'created' ? setResult('saved') : setResult('error');

  {/* upload image */}
    const formData = new FormData();
    const fileInput = document.querySelector('#file') as HTMLInputElement | null;

    if ( data.status === 'created' && fileInput?.files?.[0] ) {
    {/* first parameter is field name in form */}
      formData.append('file0', fileInput.files[0]);

      const uploadImage = await RequestAjax( `${url}upload-image/${data.article._id}`, 'POST', formData, true, true );

      uploadImage.data.status === 'created' ? setResult('saved') : setResult('error');
    }
  }

  return (
    <>
      {translationsTasks && translationsTasks?.tasks ? (
        <div className="home">
          <h1>{t(translations.tasks['Create task'])}</h1>

          <strong>{ result === 'saved' ? 'Task saved successfully!' : '' }</strong>
          <strong>{ result === 'error' ? 'The provided data is incorrect!' : '' }</strong>

          <form className='form' onSubmit={ saveTask }>
            <div className="form-group">
              <label htmlFor="task">{t(translations.tasks['Task'])}</label>
              <input type="text" name="task" onChange={ changed } />
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
                    locale={ language }
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

            {/* <div className="form-group"> */}
            {/* <label htmlFor="file0">Image</label> */}
            {/* <input type="file" name="file0" id="file" /> */}
            {/* </div> */}

            <div className="form-group">
              <label htmlFor="comment">{t(translations.tasks['Comment'])}</label>
              <textarea name="comment" rows={4} cols={40} onChange={ changed } />
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
