import React, { useState ,useRef} from 'react'

export default function ParentTest() {
    const [name,setNmae] = useState("");
    const callBack = (x)=>{
        setNmae(x);

    }
  return (
    <>
        <h2>{name}</h2>
        <Child fun={callBack}/>
    </>
  )
}

function Child(props){
    const nameRef = useRef();
    return (
        <>
            <input type="text" ref={nameRef}/>
            <button onClick={()=>props.fun(nameRef.current.value)}>click</button>

        </>
    )
}