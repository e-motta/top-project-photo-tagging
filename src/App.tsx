import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Layout from './components/Layout';
import Level from './features/levels/Level';

function App() {
  const [content, setContent] = useState(<Home />); // <Level id={'0'} /> <Home />

  // return <Layout>{content}</Layout>;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="level/:levelId" element={<Level />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
