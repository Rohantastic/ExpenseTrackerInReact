import './App.css';
import Home from './components/pages/Home';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
