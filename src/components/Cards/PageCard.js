import React from 'react';

import HeaderStats from 'components/Headers/HeaderStats';
import Card from './Card';

function PageCard({
  className,
  children,
  color,
  headerContent,
  renderRightSide,
  title,
}) {
  return (
    <div>
      <HeaderStats content={headerContent} />
      {(title || children || renderRightSide) && (
        <div className="px-4 relative  md:px-10 mx-auto w-full">
          <Card
            className={`${className} -mt-24`}
            color={color}
            renderRightSide={renderRightSide}
            title={title}
          >
            {children}
          </Card>
        </div>
      )}
    </div>
  );
}

export default PageCard;
