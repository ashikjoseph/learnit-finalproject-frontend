import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Notebank from './Pages/Notebank';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"} />} />
        <Route path='/notebank' element={<Notebank />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
