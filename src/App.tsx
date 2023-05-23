import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import './styles.css';
import Session from './session';
import Break from './break';

function App() {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [elements, setElements] = useState<HTMLTextAreaElement[]>([]);

  const handleClickStart = () => {
    // console.log(elements);

    // const convertMinute: number = parseInt(elements[0].value) * 60;
    let totalSeconds: number = parseInt(elements[0].value) * 60 + parseInt(elements[1].value);

    const interval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      elements[0].value = `${minutes < 10 ? "0" + minutes : minutes}`;
      elements[1].value = `${seconds < 10 ? "0" + seconds : seconds}`;
      totalSeconds--;

      if (totalSeconds <= 0) {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        alert("Time's up!");
      }
    }, 1000);

    setIntervalId(interval);
  }

  return (
    <>
      <div id='Container'>
        <Session IntervalId={intervalId} SetIntervalId={setIntervalId} SetElements={setElements}/>
        <div>
          <button onClick={() => intervalId && clearInterval(intervalId)}>stop</button>
          <button onClick={handleClickStart}>start break</button>
        </div>
        <Break/>
      </div>
    </>
  )
}

export default App
