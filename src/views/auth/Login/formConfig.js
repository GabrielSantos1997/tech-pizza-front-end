import * as yup from 'yup';

export const schema = yup.object().shape({
  username: yup.string().required('O campo é obrigatório'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres.')
    .required('O campo é obrigatório'),
  recaptcha_token: yup.string().nullable().required('O campo é obrigatório'),
});
export const initialValues = {
  username: '',
  password: '',
  recaptcha_token: '',
};
