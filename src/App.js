import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Notebank from './Pages/Notebank';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';
import Payment from './Pages/Payment';
import ViewPdf from './Pages/ViewPdf';


function App() {
  const {isAuthToken, setIsAuthToken}=useContext(isAuthTokenContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"} />} />
        <Route path='/notebank' element={isAuthToken? <Notebank/> :<Home/>} />
        <Route path='/dashboard' element={ <Dashboard/>} />
        <Route path='/dashboard' element={isAuthToken? <Dashboard/> : <Home/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path="/viewpdf" element={<ViewPdf />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
