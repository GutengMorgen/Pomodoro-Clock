import React, { useState } from 'react';

const Break: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<boolean>(true);

  const handleClick = () => {
    if(edit)
    {
      setEdit(false);
      if(props.IntervalId.current !== null){
        clearInterval(props.IntervalId.current);
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

    if(minuteElement.value > '60' || secondElement.value > '60')
      return alert('los valores no son validos! IDIOTE');

    else {
      setEdit(true);
      if(props.RefButton.current !== null)
        props.RefButton.current.disabled = false;
    }
  }

  return(
    <div id='breakContainer'>
      <button className="editBtn" onClick={handleClick}>edit</button>
      <textarea className="minutes" defaultValue='05' maxLength={2}></textarea>
      <span className="separador">:</span>
      <textarea className="seconds" defaultValue='00' maxLength={2}></textarea>
      {!edit && <button onClick={handleSaveClick}>save</button>}
    </div>
  )
}

interface Props{
  IntervalId: React.MutableRefObject<number | null>;
  RefButton: React.RefObject<HTMLButtonElement>;
}

export default Break;