import './App.css';
import SignupPage from './components/pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignupPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
