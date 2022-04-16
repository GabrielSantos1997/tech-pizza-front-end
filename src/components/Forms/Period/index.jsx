import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import { dateFormatted, newDate, ptDateFormatted } from 'utils/date';
import { CalendarWrapper, Container, ContainerCalendar } from './styles';

const ConsultationByPeriod = ({ search, setSearch }) => {
  const [activeCalendar, setActiveCalendar] = useState(false);
  const [period, setPeriod] = useState(null);
  const { startsAt, endsAt } = search || {};

  const actionActiveCalendar = () => {
    setActiveCalendar(!activeCalendar);
  };

  useEffect(() => {
    if (!startsAt || !endsAt) return;

    const formatted = [newDate(startsAt), newDate(endsAt)];
    setPeriod(formatted);
  }, []);

  function onChange(date) {
    setPeriod(date);

    setSearch({
      ...search,
      startsAt: dateFormatted(date[0]),
      endsAt: dateFormatted(date[1]),
    });
  }

  function clearCalendar() {
    setSearch({
      ...search,
      startsAt: '',
      endsAt: '',
    });
    setPeriod(null);
  }

  return (
    <Container active={activeCalendar}>
      <div
        className="cursor-pointer shadow p-2 flex items-center justify-between rounded-sm"
        onClick={actionActiveCalendar}
        id="period"
        role="button"
        onKeyDown={(key) => key.code === 'Enter' && setActiveCalendar(true)}
        tabIndex="0"
      >
        <small>
          {!period
            ? ''
            : `de ${ptDateFormatted(period[0])} até ${ptDateFormatted(
                period[1]
              )}`}
        </small>
        {!activeCalendar ? (
          <IoIosArrowDown size={15} color="#aaaaaa" />
        ) : (
          <IoIosArrowUp size={15} color="#aaaaaa" />
        )}
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
                className="calendar"
                value={period}
                onChange={onChange}
                minDetail="month"
                calendarType="US"
                next2Label={null}
                prev2Label={null}
                selectRange
                formatShortWeekday={(_, value) =>
                  ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][
                    value.getDay()
                  ]
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
export default ConsultationByPeriod;
