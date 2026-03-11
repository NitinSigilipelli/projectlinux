import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export default function OutputPage(){

const [text,setText] = useState("")
const [messages,setMessages] = useState([])

const terminalRef = useRef(null)

const navigate = useNavigate()

useEffect(()=>{

const unsub = onSnapshot(collection(db,"outputs"),(snap)=>{

setMessages(
snap.docs.map(doc => ({
id: doc.id,
...doc.data()
}))
)

setTimeout(()=>{
terminalRef.current?.scrollTo({
top: terminalRef.current.scrollHeight,
behavior:"smooth"
})
},50)

})

return ()=>unsub()

},[])


const submit = async ()=>{

const command = text.trim()

if(!command) return

// Navigation commands
if(command === "cd input"){
navigate("/input")
setText("")
return
}

if(command === "cd output"){
navigate("/output")
setText("")
return
}

await addDoc(collection(db,"outputs"),{
text:command,
created:serverTimestamp()
})

setText("")

}


const copyText = (value)=>{
navigator.clipboard.writeText(value)
}


return(

<div
style={{
background:"#000",
color:"#fff",
fontFamily:"Consolas, monospace",
height:"100vh",
width:"100vw",
padding:"20px",
overflow:"hidden"
}}
>

<div
ref={terminalRef}
style={{
height:"100%",
overflowY:"auto",
fontSize:"18px",
lineHeight:"1.6",
whiteSpace:"pre-wrap",
wordBreak:"break-word"
}}
>

{/* Command history */}

{messages.map((msg)=>(

<div
key={msg.id}
style={{
whiteSpace:"pre-wrap",
wordBreak:"break-word"
}}
>

<span style={{opacity:0.7}}>
enjoy@terminal:~
<span
style={{
cursor:"pointer",
userSelect:"none"
}}
title="Copy command"
onClick={()=>copyText(msg.text)}
>
$
</span>
</span>{" "}

{msg.text}

</div>

))}

{/* Current command */}

<div style={{whiteSpace:"pre-wrap"}}>

<span style={{opacity:0.7}}>
enjoy@terminal:~$
</span>{" "}

<input
value={text}
onChange={(e)=>setText(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
submit()
}
}}
style={{
background:"transparent",
border:"none",
outline:"none",
color:"#fff",
fontFamily:"inherit",
fontSize:"18px",
width:"100%"
}}
autoFocus
/>

</div>

</div>

</div>

)

}