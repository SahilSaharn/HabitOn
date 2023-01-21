import React from 'react'
import "../Component_styles/LandingPage_styles.css"
import images from '../usedImages/images.js'

import { motion } from 'framer-motion';

const leftFadeIn = {
  from : {
    opacity :0,
    x: -500
  },
  to : {
    opacity :1,
    x : 0,
    transition : {
      delay : 1,
      type : 'spring',
      duration :0.6,
      bounce : 0.5
    }
  }
}

const popUp = {
  from : {
    opacity :0,
    scale : 0
  },
  to : {
    opacity : 1,
    scale :1,
    transition : {
      delay : 1.5,
      type : "spring",
      bounce : 0.5,
      duration : 0.4
    }
  }
}

const imageAnimate = {
  from : {
    opacity :0,
    x : 300,
  },
  to : {
    opacity : 1,
    x :0,
    transition : {
      delay : 0.3,
      type : 'spring',
      duration :0.4,
      bounce : 0.5
    }
  }
}

const questionaAnimate = {
  from : {
    x : -300,
    opacity : 0,
  },
  to : {
    x :0,
    opacity :1,
    transition : {
      delay : 0.4,
      type : 'spring',
      duration : 0.5,
      bounce : 0.5
    }
  }
}

const paraAnimate = {
  from : {
    y : 30,
    opacity : 0,
  },
  to : {
    y : 0,
    opacity :1,
    transition : {
      delay : 1,
      duration : 0.4,
    },
  },
  viewport : {
    once :true
  }
}

function LandingPage() {
  const [imgi ,setImgi] = React.useState(0);

  React.useEffect( ()=> {
    const changingImage = setInterval(() => {

      document.getElementById('image-holder').style.opacity="0";
      setImgi( (prev) => {
        if(prev >= 4)
        return 0;
        return prev+1;
      })

      setTimeout(() => {
        document.getElementById('image-holder').style.opacity="1";
      }, 400);

    }, 60000);
    return () => clearInterval(changingImage);
  }, [] )

  return (
    <motion.div className='sofi'
      initial={{ opacity : 0 }}
      animate={{ opacity : 1 }}
      exit={{ x: "90vw", opacity : 0  }}
      transition={{ duration: 0.5 }}
    >
      <header className='header-cont'>
        <motion.div 
          variants={leftFadeIn} 
          initial={"from"} 
          animate={"to"}
          > 
          <h1> your habits will determine your future. </h1>
          <motion.a variants={popUp}  href="/" id='enter-now-btn' > change your future now! </motion.a>
        </motion.div>
        <motion.img src={ (imgi < images.length) ? images[imgi] : images[0] }
          alt="oops!" 
          id='image-holder'
          variants = { imageAnimate} 
          initial = {'from'}
          animate = {'to'}
        />
      </header>

      {/* till here we have our header element  */}
      <div className="temp">
      <div className="dark-bg-cont">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f9f9f9" fillOpacity="1" d="M0,192L60,176C120,160,240,128,360,112C480,96,600,96,720,122.7C840,149,960,203,1080,192C1200,181,1320,107,1380,69.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>

        <div className="content-holder">

          <motion.h3
            variants = {questionaAnimate}
            initial = {'from'}
            whileInView = {'to'}
            viewport = {{once:true}}
          >What is Habit O(n) ?</motion.h3>
          <motion.p variants ={paraAnimate} initial={'from'} whileInView ={'to'} viewport ={{once : true}} >
            habit o(n) is a productivity tool that will accompany you in your consistent habit building journey by reminding you your daily schedule & motivate you towards your great habits by having streak system and graphics for which your future self will thank you !           
          </motion.p>
        </div>

        <div className="content-holder">
          <motion.h3
            variants = {questionaAnimate}
            initial = {'from'}
            whileInView = {'to'}
            viewport = {{once:true}}
          >Why Habit O(n) ?</motion.h3>
          <motion.p variants ={paraAnimate} initial={'from'} whileInView ={'to'} viewport ={{once : true}}  >
            Habit O(n) isn’t like any other Todo list, its much more than that. it provides you daily habit reminder’s so that you can adjust you schedule as per your suitable time and it also provides you the score and analytics of your habits so you stay motivated and consistent to be a better self           
          </motion.p>
        </div> 

        <div align="center">
          <motion.a href="/" id="how-to-use-btn" variants= {popUp} initial={'from'} whileInView = {'to'} > how to use Habit O(n) </motion.a>
        </div>

        <motion.div className="bottom-btns-container"
          initial = {{ opacity:0 , y : 100 }}
          whileInView = {{opacity :1 , y : 0}}
        >
          <a href="/" >About us!</a>
          <a href="/" >Sign up/in</a>
        </motion.div>

      </div>
      </div>

    </motion.div>
  )
}

export default LandingPage