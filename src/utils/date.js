import pt from 'date-fns/locale/pt-BR';
import {
  formatDistanceToNowStrict,
  differenceInDays,
  format,
  isValid,
  parseISO,
} from 'date-fns';
import { isToday } from 'date-fns/esm';

export const newDate = (date) => {
  if (!date || date instanceof Date) {
    return date;
  }

  const dateString = date.toString();
  const dateISO = parseISO(dateString);
  const dateParsed = isValid(dateISO) ? dateISO : new Date(dateString);

  return isValid(dateParsed) ? dateParsed : null;
};

export function getTimeDistance(date, maxDays = 7) {
  const now = new Date();

  const dateObject = date instanceof Date ? date : newDate(date);

  if (dateObject instanceof Date) {
    if (differenceInDays(now, dateObject) < maxDays) {
      return `há ${formatDistanceToNowStrict(dateObject, { locale: pt })}`;
    }
    return format(dateObject, 'hh:mm dd/MM/yyyy', { locale: pt });
  }
  return null;
}

export const dateInFull = (date) => {
  const dateObject = newDate(date);

  if (dateObject instanceof Date) {
    return format(dateObject, "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }
  return null;
};

export const dateAndHourInFull = (date) => {
  const dateObject = newDate(date);

  if (dateObject instanceof Date) {
    return format(dateObject, "dd 'de' MMMM 'de' yyyy 'às' hh:mm", {
      locale: pt,
    });
  }
  return null;
};
export const ptDateFormatted = (date) => {
  const dateObject = newDate(date);

  if (dateObject instanceof Date) {
    return format(dateObject, 'dd/MM/yyyy', { locale: pt });
  }
  return null;
};

export const ptDateAndHourFormatted = (date) => {
  const dateObject = newDate(date);

  if (dateObject instanceof Date) {
    if (isToday(dateObject)) {
      return format(dateObject, "'HOJE' HH:mm ", { locale: pt });
    }
    return format(dateObject, 'dd/MM/yyyy cccccc HH:mm  ', { locale: pt });
  }
  return null;
};
export const dateFormatted = (date) => {
  const dateObject = newDate(date);

  if (dateObject instanceof Date) {
    return format(dateObject, 'yyyy-MM-dd', { locale: pt });
  }
  return null;
};
