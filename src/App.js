import Navbar from './components/navbar/Navbar';
import './App.css';

// import Rootlayout from './components/Rootlayout';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './components/register/Register';
import UserLoginStore from './contexts/UserLoginStore';
import Upload from './components/upload/Upload';
import { LoginContext } from './contexts/loginContext';
  /* The following line can be included in your src/index.js or App.js file */




function App() {

  


  return (
    <div className='main' >

     <UserLoginStore>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/upload" element={<Upload/>}/>

     </Routes>
     </BrowserRouter>
     </UserLoginStore>
    </div>
  );
}

export default App;
