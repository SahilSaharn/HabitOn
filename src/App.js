import './App.css';

import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import ErrorComponent from './Components/ErrorComponent';
import ErrorState from './Contexts/ErrorState';
import SignUpPage from './Components/SignUpPage';
import UserAndThemeStates from './Contexts/UserAndThemeStates';
import SignInPage from './Components/SignInPage';
import HabitWrapper from './Components/HabitWrapper';
import ForgotPassPage from './Components/ForgotPassPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageNotFoundPage from './Components/PageNotFoundPage';
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
                <Route path='/signin' element={<SignInPage />} />
                <Route path='/forgotpassword' element={<ForgotPassPage />} />
                <Route path='/habits/:email' element={<HabitWrapper />} />
                <Route path='*' element={<PageNotFoundPage />} />
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
