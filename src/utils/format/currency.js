/**
 *
 * get value 1234 to 12.34 when decimalPlaces 2
 * get value 1234 to 1234.00 when decimalPlaces 0
 * get value 1234 to 123400.00 when decimalPlaces -2
 * @param {string} value
 */
export function insertDot(value = 0, decimalPlaces = 2) {
  let newValue = +value;
  if (decimalPlaces >= 0) {
    for (let x = 0; x < decimalPlaces; x += 1) {
      newValue /= 10;
    }
    return newValue.toFixed(decimalPlaces);
  }

  for (let x = 0; x < decimalPlaces; x += 1) {
    newValue *= 10;
  }
  return newValue.toFixed(decimalPlaces * -1);
}

export function formatCurrency(num, to = 2, currency = 'BRL') {
  const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  });

  if (!Number.isNaN(+num)) {
    const newNum = insertDot(num, to);
    switch (currency) {
      case 'BRL':
        return formatPrice(newNum);
      //  return `R$${newNum}`;
      default:
        return `${newNum}VND`;
    }
  }
  return null;
}

export function formatSingleNumber(n) {
  return n > 9 ? `${n}` : `0${n}`;
}

export function convertToSlug(title, id) {
  const renderId = id ? `-${id}` : '';
  return title ? title.replace(/ /g, '-').toLowerCase() + renderId : '';
}

export function renderContainer(type) {
  switch (type) {
    case 'wide':
      return 'container-full-half';
    case 'full':
      return 'container-full';
    default:
      return 'container';
  }
}
