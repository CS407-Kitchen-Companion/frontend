import styled from '@emotion/styled'
import React, { useState, useEffect, useRef } from 'react'

//timer for steps
export const TimerComponent: React.FC = () => {
  const [createTimer, setCreateTimer] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [intervalId, setIntervalId] = useState<number>(-1); // Initialize intervalId with -1

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(() => {
    let intervalId: number;

    if (timeLeft <= 0 && timerOn) {
      setNotificationShown(true);
      setTimerOn(false);
      alert("Time is up!");
      setTimeLeft(0);
      setIsPaused(false);
    } else if (timerOn && timeLeft > 0 && !isPaused) {
      intervalId = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clear the interval when component unmounts or conditions change
  }, [timerOn, timeLeft, isPaused]);

  const handleStart = () => {
    const hoursRef = useRef<HTMLInputElement | null>(null);
    const minutesRef = useRef<HTMLInputElement | null>(null);
    const secondsRef = useRef<HTMLInputElement | null>(null);
 
    const hoursInput = hoursRef.current ? parseInt(hoursRef.current.value) || 0 : 0;
    const minutesInput = minutesRef.current ? parseInt(minutesRef.current.value) || 0 : 0;
    const secondsInput = secondsRef.current ? parseInt(secondsRef.current.value) || 0 : 0;

    const totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

    setTimeLeft(totalSeconds);
    setTimerOn(true);
    setIsPaused(false);
    setNotificationShown(false);
  };

  const handlePause = () => { //pause
    setIsPaused(!isPaused);
  };

  const handleStop = () => { //stop
    setTimerOn(false);
    setTimeLeft(0);
    setIsPaused(false); // Ensure timer stops and resets when stopped
    setNotificationShown(false);
  };

  const handleCreateTimer = () => { //stop
    setCreateTimer(!createTimer);

  };

  return (
    <div style={{ display: 'inline-block' }}>

      <button onClick={handleCreateTimer}>Timer?</button>
      { createTimer && !timerOn && (
        <>
          <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <span>Hours:</span>
        <select ref={hoursRef}>
          {[...Array(10).keys()].map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>

      </div>

      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        <span>Minutes:</span>
        <select ref={minutesRef} defaultValue="10"> {/* TODO: fix Set defaultValue to 10 */}
          {[...Array(59).keys()].map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'inline-block' }}>
        <span>Seconds:</span>
        <select ref={secondsRef} >
          {[...Array(59).keys()].map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>
      <button onClick={handleStart}>Set Timer</button>
        </>
      )}


      {timerOn && (
        <>
          <button onClick={handlePause}>{isPaused ? 'Resume Timer' : 'Pause Timer'}</button>
          <button onClick={handleStop}>Stop Timer</button>
          <p style={{ display: 'inline-block', marginLeft: '10px' }}>Time left: {timeLeft} seconds</p>
        </>
      )}

      {notificationShown && <span style={{ display: 'inline-block', marginLeft: '10px' }}>Time is up!</span>}
    </div>
  );
}