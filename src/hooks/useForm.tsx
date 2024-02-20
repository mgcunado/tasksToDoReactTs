import { useState } from 'react';

export const useForm = (initialObject = {}) => {
  const [form, setForm] = useState(initialObject);

  const changed = ({target}: any) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value
    })
  };

  return {
    form,
    changed
  }
}
