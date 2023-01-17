import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import ErrorComponent from './Components/ErrorComponent';
import ErrorState from './Contexts/ErrorState';
function App() {
  return (
    <>
      <ErrorState>
    
        <Navbar />
        <LandingPage />
        <ErrorComponent />
      
      </ErrorState>
    </>
  );
}
export default App;
