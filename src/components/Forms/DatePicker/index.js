import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Calendar from 'react-calendar';
import { isValid } from 'date-fns';
import ReactInputMask from 'react-input-mask';

import 'react-calendar/dist/Calendar.css';
import { dateFormatted, newDate, ptDateFormatted } from 'utils/date';
import { CalendarWrapper, Container, ContainerCalendar } from './styles';

const DatePicker = ({
  maxDate,
  minDate,
  name,
  value,
  onChange,
  placeholder,
}) => {
  const [activeCalendar, setActiveCalendar] = useState(false);
  const [period, setPeriod] = useState('');
  const input = useRef();

  function actionActiveCalendar() {
    setActiveCalendar(!activeCalendar);
  }

  function handleChange(date) {
    setPeriod(date);
    onChange(dateFormatted(date));
  }
  function clearCalendar() {
    setPeriod(null);
    onChange('');
  }

  useEffect(() => {
    setPeriod(newDate(value));
  }, [value]);

  return (
    <Container active={activeCalendar}>
      <div className="flex items-center justify-between" id="period">
        <ReactInputMask
          onKeyDown={(key) =>
            (key.code === 'Enter' || key.code === 'Tab') &&
            setActiveCalendar(false)
          }
          onFocus={() => {
            setActiveCalendar(true);
          }}
          placeholder={placeholder}
          name={name}
          value={ptDateFormatted(value) || input.current}
          type="text"
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          onChange={(e) => {
            const { value: inputValue } = e.target;
            input.current = inputValue;

            const dt = inputValue?.split('/');
            const date = new Date(`${dt[1]}-${dt[0]}-${dt[2]}`);

            if (isValid(date)) {
              onChange(dateFormatted(date));
            } else {
              onChange('');
            }
          }}
          mask="99/99/9999"
        />

        <div className="absolute right-0 mr-3">
          {!activeCalendar ? (
            <IoIosArrowDown size={15} color="#aaaaaa" />
          ) : (
            <IoIosArrowUp size={15} color="#aaaaaa" />
          )}
        </div>
      </div>
      {activeCalendar && (
        <>
          <div
            className="background"
            role="button"
            onKeyDown={(key) => key.code === 'Esc' && actionActiveCalendar()}
            onClick={actionActiveCalendar}
            tabIndex="0"
          >
            <></>
          </div>
          <ContainerCalendar>
            <CalendarWrapper>
              <Calendar
                minDate={minDate}
                maxDate={maxDate}
                className="calendar"
                value={period}
                onChange={handleChange}
                calendarType="US"
                next2Label={null}
                prev2Label={null}
                formatShortWeekday={(_, v) =>
                  ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][v.getDay()]
                }
              />
            </CalendarWrapper>

            <div className="flex m-2 justify-end">
              <button
                onClick={clearCalendar}
                type="button"
                className="text-white mr-2 active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 border bg-red-400"
              >
                Limpar
              </button>
              <button
                onClick={actionActiveCalendar}
                type="button"
                className="text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 border bg-primary"
              >
                Fechar
              </button>
            </div>
          </ContainerCalendar>
        </>
      )}
    </Container>
  );
};
export default DatePicker;
