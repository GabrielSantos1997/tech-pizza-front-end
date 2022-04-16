import React, { useCallback, useEffect } from 'react';

import ConsultationByPeriod from '../Forms/Period';

const PeriodTabs = ({
  color,
  period,
  setPeriod,
  openTabTime,
  setOpenTabTime,
}) => {
  const init = useCallback(
    (tab) => {
      const periods = [
        'today',
        'yesterday',
        'week',
        'month',
        // 'six-months',
        // 'year',
      ];

      const interval = periods[tab - 1];

      delete period?.startsAt;
      delete period?.endsAt;

      return periods[tab - 1] !== undefined
        ? {
            ...period,
            interval,
          }
        : {};
    },
    [period]
  );

  useEffect(() => {
    if (openTabTime) setPeriod(init(openTabTime));
  }, [openTabTime, setPeriod]);

  return (
    <section>
      <ul className="flex flex-wrap  items-center justify-between mt-1">
        <li className="mb-5 text-center">
          <a
            className={` text-white  active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 ${
              openTabTime === 1
                ? `text-white bg-${color}`
                : 'border text-blueGray-600 bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTabTime(1);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            hoje
          </a>
        </li>
        <li className="mb-5 text-center">
          <a
            className={` text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 ${
              openTabTime === 2
                ? `text-white bg-${color}`
                : 'border text-blueGray-600 bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTabTime(2);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            ontem
          </a>
        </li>
        <li className="mb-5 text-center">
          <a
            className={` text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 ${
              openTabTime === 3
                ? `text-white bg-${color}`
                : 'border text-blueGray-600 bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTabTime(3);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            Essa semana
          </a>
        </li>
        <li className="mb-5 text-center">
          <a
            className={` text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 ${
              openTabTime === 4
                ? `text-white bg-${color}`
                : 'border text-blueGray-600 bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTabTime(4);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            Esse mês
          </a>
        </li>
        <li className="mb-5 text-center">
          <a
            className={` text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150 ${
              openTabTime === 5
                ? `text-white bg-${color}`
                : 'border text-blueGray-600 bg-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setPeriod({ ...period });
              setOpenTabTime(5);
            }}
            data-toggle="tab"
            href="#link5"
            role="tablist"
          >
            outro período
          </a>
        </li>

        <div className="w-4/12 mb-5">
          {openTabTime === 5 && (
            <ConsultationByPeriod
              search={period}
              setSearch={(e) => {
                delete period?.interval;
                setPeriod(e);
              }}
            />
          )}
        </div>
      </ul>
    </section>
  );
};

export default PeriodTabs;
