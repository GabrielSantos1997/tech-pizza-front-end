import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().required('Campo obrigatório.'),
  voiceGenre: yup.string().required('Campo obrigatório.'),
  length: yup.string().required('Campo obrigatório.'),
  text: yup.string().required('Campo obrigatório.'),
  backgroundVolume: yup.string().required('Campo obrigatório.'),
  voiceVolume: yup.string().required('Campo obrigatório.'),
  background: yup.string().required('Campo obrigatório.'),
  user: yup.string().required('Campo obrigatório.'),
  voiceInputSecond: yup.string().required('Campo obrigatório.'),
  pitch: yup.string().required('Campo obrigatório.'),
  rate: yup.string().required('Campo obrigatório.')
});
