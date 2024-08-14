import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './components/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Ticket from './components/Ticket';
function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/ticket' element={<Ticket/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
