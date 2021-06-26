import React , {useState, useRef} from 'react';
import './App.css';

function padTime(time){
   return time.toString().padStart(2, '0');
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);//takes in seconds
  const [title, setTitle] = useState('Let the countdown begin!!');
  const [isRunning , setIsRunning] = useState(false);
  const intervelRef = useRef(null);

  function startTimer(){
    if(intervelRef.current !== null) return;
    setTitle(`You're doing great!`)
    setIsRunning(true);
    //storing current intervel
    intervelRef.current = setInterval( () => {
      setTimeLeft( timeLeft => {
        if(timeLeft >= 1) return timeLeft - 1;

        //reset timer
        resetTimer();
        return 0;
      });//through this react gonna look throung previous value and update , without this app wont wrok
    },1000);
  }

  function stopTimer(){
    if(intervelRef.current === null) return;
    //clearing the intervel
    clearInterval(intervelRef.current);
    intervelRef.current = null;
    setTitle('Keep it up!');
    setIsRunning(false);
  }

  function resetTimer(){
    clearInterval(intervelRef.current);
    intervelRef.current = null;
    setTitle('Ready to go another round?');
    setTimeLeft(25*60);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft/60));
  const seconds = padTime(timeLeft - minutes* 60); 

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick = {startTimer}>Start</button>}
        {isRunning && <button onClick = {stopTimer}>Stop</button>}
        <button onClick = {resetTimer}>Reset</button>
      </div>
    </div>
  );
}
