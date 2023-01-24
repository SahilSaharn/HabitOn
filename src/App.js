import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import ErrorComponent from './Components/ErrorComponent';
import ErrorState from './Contexts/ErrorState';
import SignUpPage from './Components/SignUpPage';
import UserAndThemeStates from './Contexts/UserAndThemeStates';
import VerifyPage from './Components/VerifyPage';
import RegisterUserPage from './Components/RegisterUserPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
function App() {

  const location = useLocation();
  return (
    <>
      <div className='overflow-hidden' >
        <ErrorState>
          <UserAndThemeStates>

            <Navbar />

            <AnimatePresence mode='wait' >
              <Routes location={location} key={location.pathname} >
                <Route path='/' element={<LandingPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/verify/:email' element={<VerifyPage />} />
                <Route path='/register' element={<RegisterUserPage />} />
              </Routes>
            </AnimatePresence>

            <ErrorComponent />

          </UserAndThemeStates>
        </ErrorState>
      </div>
    </>
  );
}
export default App;
