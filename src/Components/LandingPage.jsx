import React from 'react'
import "../Component_styles/LandingPage_styles.css"
// import a from "../usedImages/header-bg-image.png"
// import b from "../usedImages/header-bg-image-5.png"
// import c from "../usedImages/header-bg-image.png"
// import d from "../usedImages/header-bg-image.png"

import images from '../usedImages/images.js'

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

    }, 7000);
    return () => clearInterval(changingImage);
  }, [] )

  console.log('hello :)');
  return (
    <div className='sofi' >
      <header className='header-cont'>
        <div > 
          <h1> your habits will determine your future. </h1>
          <a href="/" id='enter-now-btn' > change your future now! </a>
        </div>
        <img src={ (imgi < images.length) ? images[imgi] : images[0] } alt="oops!" id='image-holder' />
      </header>

      {/* till here we have our header element  */}
      <div className="temp">
      <div className="dark-bg-cont">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f9f9f9" fill-opacity="1" d="M0,192L60,176C120,160,240,128,360,112C480,96,600,96,720,122.7C840,149,960,203,1080,192C1200,181,1320,107,1380,69.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>

        <div className="content-holder">

          <h3>What is Habit O(n) ?</h3>
          <p>
            habit o(n) is a productivity tool that will accompany you in your consistent habit building journey by reminding you your daily schedule & motivate you towards your great habits by having streak system and graphics for which your future self will thank you !           
          </p>
        </div>

        <div className="content-holder">
          <h3>Why Habit O(n) ?</h3>
          <p>
            Habit O(n) isn’t like any other Todo list, its much more than that. it provides you daily habit reminder’s so that you can adjust you schedule as per your suitable time and it also provides you the score and analytics of your habits so you stay motivated and consistent to be a better self           
          </p>
        </div>

      </div>
      </div>

    </div>
  )
}

export default LandingPage