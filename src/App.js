import './App.css';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import ErrorComponent from './Components/ErrorComponent';
import ErrorState from './Contexts/ErrorState';
function App() {
  return (
    <>
      <Navbar />
      <LandingPage/>

      <ErrorState>
        <ErrorComponent/>
      </ErrorState>
      
    </>
  );
}
export default App;
