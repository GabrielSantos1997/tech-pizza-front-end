export function ordinalNumbersInFull(number) {
  const units = [
    'primeira',
    'segunda',
    'terceira',
    'quarta',
    'quinta',
    'sexta',
    'sétima',
    'oitava',
    'nona',
  ];
  const tens = [
    'décima ',
    'vigésima ',
    'trigésima ',
    'quadragésima ',
    'quinquagésima ',
    'sexagésima ',
    'setuagésima ',
    'octogésima ',
    'nonagésima ',
  ];

  if (units.length + 1 > number) {
    return units[number - 1] ? units[number - 1] : '';
  }
  if ((units.length + 1) * 10 > number) {
    const newNumber = number.toString();
    const unit = units[newNumber[1] - 1] ? units[newNumber[1] - 1] : '';

    return tens[newNumber[0] - 1] + unit;
  }
  return 'number greater than 99';
}
