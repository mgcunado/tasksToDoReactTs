import { useState } from 'react';

export const useForm = (initialObject: any) => {
  const [form, setForm] = useState(initialObject);

  const serializeForm = (form: any) => {
    const formData = new FormData(form);

    const objectFromForm: {[key: string]: any} = {};
    for (const [name, value] of formData) {
      objectFromForm[name] = value;
    }

    return objectFromForm;
  };

  const sended = (e: any) => {
    e.preventDefault();

    const course = serializeForm(e.target);
    setForm(course)
  };

  const element = document.querySelector('.code');
  if (element) {
    element.classList.add('sended');
  }

  const changed = ({target}: any) => {
    const { name, value } = target || {};

    setForm({
      ...form,
      [name]: value
    })
  };

  return {
    form,
    sended,
    changed
  }
}
