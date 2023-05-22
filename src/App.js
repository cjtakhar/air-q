import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Dash from './components/dash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/air-q" element={ < Dash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
