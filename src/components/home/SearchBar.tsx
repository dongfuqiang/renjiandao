import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('baidu');

  const searchEngines = [
    { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' },
    { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
    { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { id: 'yahoo', name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const engine = searchEngines.find(e => e.id === selectedEngine);
      if (engine) {
        window.open(engine.url + encodeURIComponent(searchQuery), '_blank');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索一下..."
            className="w-full pl-10 pr-40 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60"
          />
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-2 py-1 text-white text-sm focus:outline-none"
          >
            {searchEngines.map(engine => (
              <option key={engine.id} value={engine.id} className="bg-gray-800">
                {engine.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      
      {/* 热搜榜单 */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {[
          '人工智能', '科技新闻', '天气查询', '股票行情',
          '电影推荐', '美食攻略', '旅游景点', '健康养生'
        ].map((hot, index) => (
          <button
            key={index}
            onClick={() => setSearchQuery(hot)}
            className="text-white/80 hover:text-white hover:underline py-1 transition-colors"
          >
            {hot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;