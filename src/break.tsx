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

    const minuteNumber: number = parseInt(minuteElement.value);
    const secondNumber: number = parseInt(secondElement.value);
    
    if (isNaN(minuteNumber) || isNaN(secondNumber)) {
      return alert('Los valores no son válidos. Por favor, ingresa un número.');
    }

    else if (secondNumber > 60) {
      return alert('Los valores no son válidos. Los minutos y segundos deben ser menores o iguales a 60 o los segundos deben ser mayor o igual 10');
    }
    if(minuteNumber === 0 && secondNumber === 0){
      return alert('Los valores no son validos. Por favor, ingresa un número.')
    }

    else{
      console.log(minuteNumber, secondNumber)
      setEdit(true);
      if (props.RefButton.current !== null) {
        props.RefButton.current.disabled = false;
      }
    }
  }

  const validateInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const inputKey = e.key;
    const isDigit = /^\d$/.test(inputKey);
    const isDeleteKey = inputKey === 'Delete' || inputKey === 'Backspace';
  
    if (!isDigit && !isDeleteKey) {
      e.preventDefault(); // Prevent entering non-digit characters
    }
  };

  return(
    <div className='testing'>
      <button 
      className="editBtn material-symbols-rounded" 
      onClick={handleClick}
      >edit
      </button>
      <textarea 
      className="minutes" 
      defaultValue='05' 
      disabled={edit} 
      maxLength={2}
      onKeyDown={validateInput}>
      </textarea>
      <span className="separador">:</span>
      <textarea 
      className="seconds" 
      defaultValue='00' 
      disabled={edit} 
      maxLength={2}
      onKeyDown={validateInput}>
      </textarea>
      {!edit && <button onClick={handleSaveClick} className='saveBtn'>Save</button>}
    </div>
  )
}

interface Props{
  IntervalId: React.MutableRefObject<number | null>;
  RefButton: React.RefObject<HTMLButtonElement>;
}

export default Break;