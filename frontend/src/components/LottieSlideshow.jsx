import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData1 from '../assets/Animation - 1.json';
import animationData2 from '../assets/Animation - 2.json';
import animationData3 from '../assets/Animation - 3.json';

const animations = [
  animationData1,
  animationData2,
  animationData3,
];

const LottieSlideshow = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  //change the animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Lottie
        animationData={animations[currentAnimationIndex]}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default LottieSlideshow;
