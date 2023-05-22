
export default function session(){

  return(
    <div id='breakContainer'>
      <button className="editBtn">edit</button>
      <textarea className="minutes" defaultValue='25'></textarea>
      <span className="separador">:</span>
      <textarea className="seconds" defaultValue='00'></textarea>
    </div>
  )
}