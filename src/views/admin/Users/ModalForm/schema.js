import * as yup from 'yup';

export const schema = (openTab, isAdmin) => {
  const attributesSchema = {
    name: yup.string().required('Campo obrigatório.'),
    email: yup.string().email('Este e-mail não é válido').required('Campo obrigatório.'),
    password: yup
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .required('Campo obrigatório.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas são diferentes')
      .required('Campo obrigatório.'),
  };
};
