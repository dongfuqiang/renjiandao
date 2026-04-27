// 农历和干支计算工具函数

// 简化的农历转换（实际应用中可能需要更复杂的算法）
export const getLunarDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 简化的农历映射（实际应用中需要完整的农历算法）
  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
  
  return `${lunarMonths[month - 1]}${lunarDays[day - 1]}`;
};

// 干支纪年
export const getGanZhi = (date: Date): string => {
  const year = date.getFullYear();
  
  const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  
  const tianGanIndex = (year - 4) % 10;
  const diZhiIndex = (year - 4) % 12;
  
  return `${tianGan[tianGanIndex]}${diZhi[diZhiIndex]}`;
};

// 格式化时间
export const formatTime = (date: Date, use24Hour: boolean = true): string => {
  const hours = use24Hour ? date.getHours() : date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const period = use24Hour ? '' : (date.getHours() >= 12 ? ' PM' : ' AM');
  
  return `${hours}:${minutes}${use24Hour ? `:${seconds}` : period}`;
};

// 格式化日期
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekDay = weekDays[date.getDay()];
  
  return `${year}年${month}月${day}日 ${weekDay}`;
};