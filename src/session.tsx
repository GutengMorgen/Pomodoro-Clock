import React, { useState } from 'react';


const Session: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<boolean>(true);

  const handleClick = () => {
    if(edit)
    {
      setEdit(false);
      if(props.IntervalId !== null){
        clearInterval(props.IntervalId);
      }
    }
    else{
      setEdit(true);
    }
  }

  function handleSaveClick(e: React.MouseEvent<HTMLButtonElement>) {
    const parent = e.currentTarget.parentNode;
    const minuteElement = parent?.querySelector('.minutes') as HTMLTextAreaElement;
    const secondElement = parent?.querySelector('.seconds') as HTMLTextAreaElement;
    
    // console.log(minuteElement.value, secondElement.value);

    if(minuteElement.value > '60' || secondElement.value > '60')
      return alert('los valores no son validos! IDIOTE');

    else {
      setEdit(true);
      props.SetElements([minuteElement, secondElement]);
      // const convertMinute: number = parseInt(minuteElement.value) * 60;
      // let totalSeconds: number = convertMinute + parseInt(secondElement.value);
  
      // const interval = setInterval(() => {
      //   const minutes = Math.floor(totalSeconds / 60);
      //   const seconds = totalSeconds % 60;
      //   minuteElement.value = `${minutes < 10 ? "0" + minutes : minutes}`;
      //   secondElement.value = `${seconds < 10 ? "0" + seconds : seconds}`;
      //   totalSeconds--;
  
      //   if (totalSeconds <= 0) {
      //     if (props.IntervalId) {
      //       clearInterval(props.IntervalId);
      //       props.SetIntervalId(null);
      //     }
      //     alert("Time's up!");
      //   }
      // }, 1000);
  
      // props.SetIntervalId(interval);
    }
  }


  return(
    <div id='sessionContainer'>
      <button className="editBtn" onClick={handleClick}>edit</button>
      <textarea className="minutes" defaultValue='25' disabled={edit}></textarea>
      <span className="separador">:</span>
      <textarea className="seconds" defaultValue='00' disabled={edit}></textarea>
      {!edit && <button onClick={handleSaveClick}>save</button>}
    </div>
  )
}

interface Props{
  IntervalId: number | null;
  SetIntervalId: React.Dispatch<React.SetStateAction<number | null>>;
  SetElements: React.Dispatch<React.SetStateAction<HTMLTextAreaElement[]>>;
}

export default Session;