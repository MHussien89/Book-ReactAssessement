import './App.css';
import DashBoardContainer from './pages/dashboard/DashBoardContainer';
import SearchContainer from './pages/search/SearchContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoardContainer />} />
        <Route path="search" element={<SearchContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
