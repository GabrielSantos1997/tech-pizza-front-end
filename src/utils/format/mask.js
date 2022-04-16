export const brPhone = (str) =>
  str &&
  (str.length > 10
    ? str.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
    : str.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'));
export const cpf = (str) =>
  str && str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
