import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Globals';
import { RequestAjax } from '../../helpers/RequestAjax';
import { bgColors, colors } from '../../helpers/Constants';
import { useTranslation } from 'react-i18next';

export interface PrioritiesProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPriority: number | undefined;
  translations: any
}

export const Priorities: React.FC<PrioritiesProps> = (props) => {
  const [priorities, setPriorities] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getPriorities();
  }, [])

  const getPriorities = async () => {
    const url = `${ Global.url }priority`;
    const { data } = await RequestAjax( url, 'GET');

    if ( data.status === 'success' ) {
      setPriorities(data.priorities);
    }
  }

  return (
    <>
      <select name="priorityId" onChange={props.onChange} value={props.selectedPriority}>
        {
          priorities.map((priority: any) => {
            return (
              <option
                key={priority.id}
                value={parseInt(priority.id)}
                style={{ color: colors[priority.id], backgroundColor: bgColors[priority.id] }}
              >
                  {t(props.translations.priority[priority.level])}
              </option>
            )
          })
        }
      </select>
    </>
  )
}
