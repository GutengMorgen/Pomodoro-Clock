import { useState, useRef, useEffect } from 'react'
import './App.css';
import './styles.css';
import Session from './session';
import Break from './break';

function App() {
  const refButton = useRef<HTMLButtonElement>(null);
  const intervalId = useRef<number | null>(null);
  const [elements, setElements] = useState<HTMLTextAreaElement[]>([]);
  const [verification, setVerification] = useState<boolean>(false);
  const audio = new Audio('https://www.fesliyanstudios.com/play-mp3/4386');

  useEffect(() => {
    if(!refButton.current) return;

    const _minuteC = document.querySelector('#sessionContainer') as HTMLDivElement;
    const mn1 = _minuteC.querySelector('.minutes') as HTMLTextAreaElement
    const sc1 = _minuteC.querySelector('.seconds') as HTMLTextAreaElement

    const _secondC = document.querySelector('#breakContainer') as HTMLDivElement;
    const mn2 = _secondC.querySelector('.minutes') as HTMLTextAreaElement
    const sc2 = _secondC.querySelector('.seconds') as HTMLTextAreaElement

    if(parseInt(mn1.value) > 0 || parseInt(sc1.value) > 0){
      setElements([mn1, sc1])
      setTimeout(() => {
        mn2.value = '05';
        sc2.value = '00';
      }, 1000);

      refButton.current.textContent = 'Start Session';
    }
    else if(parseInt(mn2.value) > 0 || parseInt(sc2.value) > 0){
      setElements([mn2, sc2])
      setTimeout(() => {
        mn1.value = '25';
        sc1.value = '00';
      }, 1000);
      
      refButton.current.textContent = 'Start Break';
    }
    setVerification(false);

  }, [refButton, verification]);


  const handleClickStart = () => {
    let totalSeconds: number = parseInt(elements[0].value) * 60 + parseInt(elements[1].value);
  
    const interval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      elements[0].value = `${minutes < 10 ? "0" + minutes : minutes}`;
      elements[1].value = `${seconds < 10 ? "0" + seconds : seconds}`;
      totalSeconds--;
  
      if (totalSeconds < 0 && refButton.current && intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
        setVerification(true);
        refButton.current.disabled = false;
        audio.play();
        setTimeout(() => audio.pause(), 4000);
      }
    }, 1000);
  
    intervalId.current = interval;
    if(refButton.current) refButton.current.disabled = true;
  }

  const handleClickStop = () => {
    if(intervalId.current && refButton.current){
      clearInterval(intervalId.current);
      refButton.current.disabled = false;
    }
  }

  return (
    <>
      <div>
        <Session IntervalId={intervalId}  RefButton={refButton}/>
        <div>
          <button onClick={handleClickStop}>Stop</button>
          <button onClick={handleClickStart} id='button' ref={refButton}>Start Session</button>
        </div>
        <Break IntervalId={intervalId} RefButton={refButton}/>
      </div>
    </>
  )
}

export default App;
