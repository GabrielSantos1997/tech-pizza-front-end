import * as yup from 'yup';

export const schemaForgotPassword = () =>
  yup.object().shape({
    username: yup.string().required('O campo é obrigatório'),
    recaptcha_token: yup.string().nullable().required('O campo é obrigatório'),
  });

export const schemaChangePassword = () =>
  yup.object().shape({
    password: yup
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .required('O campo é obrigatório'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas são diferentes')
      .required('O campo é obrigatório'),
    code: yup.string().required('O campo é obrigatório'),
  });
export const initialForgotPassword = {
  username: '',
};

export const initialChangePassword = {
  password: '',
  confirmPassword: '',
  recaptcha_token: '',
  code: '',
};
