import React from 'react';
import { useSettings } from '../../stores/settings';

const DateTimeSettings: React.FC = () => {
  const { datetime, updateDatetime } = useSettings();

  return (
    <div className="space-y-6">
      {/* 时间预览 */}
      <div className="w-full bg-gray-800 text-white p-6 rounded-lg text-center">
        <div className="text-3xl font-bold">19:31:24</div>
        <div className="text-sm opacity-80 mt-2">04月27日 星期一 三月十一 戊戌</div>
      </div>

      {/* 时间设置 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">显示时间</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={datetime.showTime}
              onChange={(e) => updateDatetime({ showTime: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">日期字体颜色</label>
          <input
            type="color"
            value={datetime.fontColor}
            onChange={(e) => updateDatetime({ fontColor: e.target.value })}
            className="w-12 h-12 rounded-md cursor-pointer"
          />
        </div>
      </div>

      {/* 内容展示 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">内容展示</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">年月</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.showYearMonth}
                onChange={(e) => updateDatetime({ showYearMonth: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">秒</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.showSeconds}
                onChange={(e) => updateDatetime({ showSeconds: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">24小时制</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.use24Hour}
                onChange={(e) => updateDatetime({ use24Hour: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">周</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.showWeek}
                onChange={(e) => updateDatetime({ showWeek: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">农历</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.showLunar}
                onChange={(e) => updateDatetime({ showLunar: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">干支</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={datetime.showGanZhi}
                onChange={(e) => updateDatetime({ showGanZhi: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSettings;