import Cookies from 'js-cookie';

interface FormData {
  [key: string]: any;
}

export const saveFormData = (data: FormData): void => {
  Cookies.set('formData', JSON.stringify(data));
};

export const getFormData = () => {
  const data = Cookies.get('formData');
  return data ? JSON.parse(data) : null;
};

export const clearFormData = () => {
  Cookies.remove('formData');
};
