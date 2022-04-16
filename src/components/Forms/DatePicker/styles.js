import styled from 'styled-components';

export const Container = styled.div`
  #period {
    display: flex;
    justify-content: space-between;
    border: ${({ active }) => (active ? '2px solid #20a8d8aa' : 'none')};
    cursor: pointer !important;
  }
  .background {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`;

export const ContainerCalendar = styled.div`
  position: absolute;
  z-index: 21;
  background-color: #fff;
  color: #20a8d8;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const CalendarWrapper = styled.div`
  .calendar {
    border: none;
    .react-calendar__navigation__label,
    .react-calendar__navigation__arrow,
    .react-calendar__navigation__prev-button {
      color: #20a8d8;
      background: transparent !important;
      font-size: 1.125rem;
      font-weight: 600;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dcdcdc;
    }
    .react-calendar__navigation button {
      min-width: 75px;
    }

    button:disabled {
      color: #999898;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      color: #a7a7a7 !important;
    }
    .react-calendar__tile {
      height: 35px;
      background: #f5f5f5;
    }

    .react-calendar__month-view__weekdays__weekday {
      font-size: 1rem;
      color: #0b0c57;
      text-transform: lowercase;
      text-decoration-style: unset !important;
      abbr[title] {
        text-decoration: none !important;
      }
    }

    .react-calendar__month-view__days__day--weekend,
    .react-calendar__month-view__days__day {
      color: #444444;
      border: 0.01rem solid #a7a7a7;
    }
    .react-calendar__tile--active {
      background: #20a8d8 !important;
      color: #e8ff15 !important;
    }

    .react-calendar__tile--now {
      background: #2e2d50;
      color: #ffffff;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: #6a6a6a;
    }

    .react-calendar__tile,
    .react-calendar__month-view__days__day {
      font-size: 16px;
    }

    .react-calendar__tile--active {
      background: #422c76;
      color: #ffffff;
    }
  }
`;
