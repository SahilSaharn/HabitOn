import React , {useEffect ,useState} from 'react'
import '../Component_styles/TodayScheduleModal_styles.css'
import toDoImage from '../usedImages/todaySchedulePageImage.svg'
import Clock from './Clock';
import { FaTimesCircle ,FaCalendar, FaCheck } from 'react-icons/fa';

function ListComponent({theme , hname}){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let str_size_to_show = 15;
  if( windowWidth < 450 )
    str_size_to_show = 15;
  else if( windowWidth < 650 )
    str_size_to_show = 25;
  else if( windowWidth < 950 )
    str_size_to_show = 35;
  else if( windowWidth > 950 )
    str_size_to_show = 40;

  return(
    <>
      <div className='to-do-list-eles-cont'
        style ={ {backgroundColor : theme ? 'rgba(10, 25, 49, 0.05)' : 'rgba(249, 249, 249, 0.05)'}}
      >
        <h4 className="to-do-hname"
        style ={ { color : theme ? '#0a1931' : '#f9f9f9'}}
        > <FaCalendar/> &nbsp; { `${hname.substring(0 ,str_size_to_show)}...` } </h4>
        <div className="to-do-list-btn-cont">
          <button> <FaCheck/> </button>
          <button> <FaTimesCircle/> </button>
        </div>
      </div>
    </>
  )
}

function TodayScheduleModal( {toggleModal , theme} ) {
  return (
    <>
    <div className="today-modal-holder sofi"
      style={{
        backgroundColor : theme ? 'rgba(249, 249, 249, 0.7)' : 'rgba(10, 25, 49, 0.7)'
      }}
    >
      <div className='today-sched-card' style = {{  backgroundColor : theme ? '#f9f9f9' : '#081427' }}>
        <div align='center'>
          <img draggable='false' id='to-do-image' src={toDoImage} alt="!oopps" />
        </div>

        <ListComponent theme={theme} hname = {'some habit name'}/>
        <ListComponent theme={theme} hname = {'some habit name'}/>
        <ListComponent theme={theme} hname = {'some habit name'}/>
        <ListComponent theme={theme} hname = {'some habit name'}/>

        <Clock itsColor = {(theme) ? "rgba(10, 25, 49, 0.5)" : '#e6e6e6'} />
        <button id='close-today-modal-btn' onClick={toggleModal} ><FaTimesCircle/></button>
      </div>
    </div>
    </>
  )
}

export default TodayScheduleModal
