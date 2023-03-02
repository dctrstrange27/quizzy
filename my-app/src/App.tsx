import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import Yours from './sideNav/Yours';
import Shared from './sideNav/Shared';
import Home from './Home/Home';
const App = () => {
  return (
    <div className="App bg-[#f4f4f4] w-full h-screen">
      <Router>
        <Routes>
          <Route  path='home' element={<Home />}>
            <Route path="yours" element={<Yours />} />
            <Route path="shared" element={<Shared />} />
          </Route>
        </Routes>
        <Outlet />
      </Router>

    </div>
  );
}
export default App;
