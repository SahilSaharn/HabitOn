import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import ErrorComponent from './Components/ErrorComponent';
import ErrorState from './Contexts/ErrorState';
import SignUpPage from './Components/SignUpPage';
import { Routes, Route ,useLocation } from 'react-router-dom';
import { AnimatePresence ,motion } from 'framer-motion';
function App() {

  const location = useLocation();
  return (
    <>
      <div className='overflow-hidden' >
      <ErrorState>

        <Navbar />
        
        <AnimatePresence>
        <Routes location = {location} key={location.pathname} >
            <Route path='/' element = { <LandingPage/> } />
            <Route path='/signin' element = { <SignUpPage/> } />
        </Routes>
        </AnimatePresence>
        
        <ErrorComponent />

      </ErrorState>
      </div>
    </>
  );
}
export default App;
