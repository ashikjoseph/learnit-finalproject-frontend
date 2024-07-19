import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Notebank from './Pages/Notebank';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';
import Payment from './Pages/Payment';
import ViewPdf from './Pages/ViewPdf';
import Myprofile from './Components/Myprofile';


function App() {
  const {isAuthToken, setIsAuthToken}=useContext(isAuthTokenContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"} />} />
        <Route path='/notebank' element={isAuthToken? <Notebank/> :<Navigate to='/login' />} />
        <Route path='/dashboard' element={isAuthToken? <Dashboard/> : <Navigate to='/login' />} />
        <Route path='/payment' element={<Payment/>} />
        <Route path="/viewpdf" element={<ViewPdf />} />
        <Route path="/myprofile" element={<Myprofile/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
