import * as yup from 'yup';

export const schema = () => {
  const attributesSchema = {
    valueAsNumber: yup.number()
   .transform((_, value) => {
      if (value.includes('.')) {
        return null;
      }
      return +value.replace(/,/, '.');
    })
    .positive(),
  }
};
