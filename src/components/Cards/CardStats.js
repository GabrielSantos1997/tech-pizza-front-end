import React from 'react';

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescription,
  statIconName,
  statIconColor,
}) {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 xl:h-full shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
          </div>

          <div className="relative w-auto  flex-initial">
            <div
              className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 rounded-full ${
                statIconColor ? `${statIconColor} shadow-lg` : ''
              }`}
            >
              <i className={statIconName} />
            </div>
          </div>
        </div>
        <span className="font-semibold text-xl text-blueGray-700">
          {statTitle}
        </span>
        <p className="text-sm text-blueGray-400 mt-4">
          <span
            className={`${statPercentColor} whitespace-nowrap mr-2  ${
              !(statArrow || statPercent) && 'opacity-0'
            }`}
          >
            <i
              className={
                statArrow === 'up'
                  ? 'fas fa-arrow-up'
                  : statArrow === 'down'
                  ? 'fas fa-arrow-down'
                  : 'fas fa-equals'
              }
            />
            {` ${statPercent}%`}
          </span>
          <span className="whitespace-nowrap">{statDescription}</span>
        </p>
      </div>
    </div>
  );
}
