import React, { useState } from 'react';

export default function Session(){
  const [edit, setEdit] = useState(true);

  const handleClick = () => {
    if(edit)
    {
      setEdit(false);
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

    if(minuteElement.value > '60' || secondElement.value > '60') alert('los valores no son validos! IDIOTE');

    else{
      setEdit(true);
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