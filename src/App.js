import './App.css';
import Home from './components/pages/Home';
import LoginPage from './components/pages/Login';
import ProfileUpdationPage from './components/pages/ProfileUpdationPage';
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
          <Route path='ProfileUpdation' element={<ProfileUpdationPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
