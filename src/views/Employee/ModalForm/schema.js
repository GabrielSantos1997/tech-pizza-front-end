import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório.'),
  email: yup.string().required('Campo obrigatório.'),
  phoneNumber: yup.string().required('Campo obrigatório.'),
  occupation: yup.string().required('Campo obrigatório.'),
});
