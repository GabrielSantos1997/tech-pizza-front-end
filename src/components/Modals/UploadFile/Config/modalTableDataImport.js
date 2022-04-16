import { ordinalNumbersInFull } from './ordinalNumbersInFull';

const columns = ['Tipo de arquivo:', 'coluna'];
export function fillTable(data) {
  const datas = [];

  for (let x = 0; x < data.length; x += 1) {
    let ordinals = ordinalNumbersInFull(x);
    ordinals = ordinals.charAt(0).toUpperCase() + ordinals.substr(1);
    if (x === 0) {
      datas.push({ column: columns[0], value: data[x] });
    } else
      datas.push({
        column: `${ordinals} ${columns[1]}:`,
        value: data[x],
      });
  }
  return datas;
}
