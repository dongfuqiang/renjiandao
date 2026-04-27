import React, { useEffect, useState } from 'react';
import { useSettings } from '../../stores/settings';
import { formatTime, formatDate, getLunarDate, getGanZhi } from '../../utils/date';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { datetime } = useSettings();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!datetime.showTime) {
    return null;
  }

  return (
    <div className="text-center text-white mb-8">
      <div 
        className="text-5xl md:text-6xl font-bold mb-2 transition-colors duration-300"
        style={{ color: datetime.fontColor }}
      >
        {formatTime(currentTime, datetime.use24Hour)}
      </div>
      <div 
        className="text-lg opacity-80 transition-colors duration-300"
        style={{ color: datetime.fontColor }}
      >
        {datetime.showYearMonth && formatDate(currentTime)}
        {datetime.showLunar && ` ${getLunarDate(currentTime)}`}
        {datetime.showGanZhi && ` ${getGanZhi(currentTime)}`}
      </div>
    </div>
  );
};

export default TimeDisplay;