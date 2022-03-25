import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal')

const Modal = ({children}) => {
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement('div');
    }

    useEffect(()=>{
        modalRoot.appendChild(elRef.current); //when ever created, inserted to the DOM. `current` is div we created above
        return ()=> modalRoot.removeChild(elRef.current) //whenever done, remove from DOM
    },[])

    return createPortal( <div> {children} </div>, elRef.current );
}

export default Modal