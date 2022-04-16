import * as yup from 'yup';

export const schema = (openPassword) => {
  const attributesSchema = {
    name: yup.string().required('Campo obrigatório.'),
    email: yup.string().email('Este e-mail não é válido').required('Campo obrigatório.'),
  };

  const passwordSchema = {
    password: yup
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .required('Campo obrigatório.'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas são diferentes')
      .required('Campo obrigatório.'),
  };

  // edit
  if (openPassword) {
    return yup.object().shape(passwordSchema);
  }
  return yup.object().shape({
    ...attributesSchema,
  });
};
