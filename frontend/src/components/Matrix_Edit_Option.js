import "./Matrix.css"
import { useState } from "react";
const Matrix_Edit_Option = () =>{

    // when button clicked...
  const [show, setShow] = useState(false);

  const selectEmp = () => {
    setShow(!show);
  };


    return(
        <div>
            {/* <div className="btn-alignment"> */}
       <button className="btn" onClick={selectEmp}>Click</button>
       {/* </div> */}
            
        </div>
    )
}

export default Matrix_Edit_Option;