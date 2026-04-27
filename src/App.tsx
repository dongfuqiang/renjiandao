import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { useUI } from './stores/ui';

const App: React.FC = () => {
  const { isSettingsOpen, isAddBookmarkOpen } = useUI();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* 弹窗显示 */}
      {isSettingsOpen && <Settings />}
      {/* 这里可以添加添加标签的弹窗 */}
    </Router>
  );
};

export default App;