import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export default function InputPage() {

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [cursorPos, setCursorPos] = useState(0);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const navigate = useNavigate();

  const sharedDocRef = doc(db, "liveInput", "sharedDoc");

  const staticLines = [
    "Welcome to Unix Terminal",
    "Available commands:",
    "Help !!!",
    "cd output -> go to output page",
    "cd input -> go to input page",
    ""
  ];

  // Live typing sync
  useEffect(() => {

    const unsub = onSnapshot(sharedDocRef,(snapshot)=>{
      if(snapshot.exists()){
        setText(snapshot.data().text || "")
      }
    })

    return ()=>unsub()

  },[])


  // Listen commands
  useEffect(()=>{

    const q = query(
      collection(db,"inputs"),
      orderBy("created","asc")
    )

    const unsub = onSnapshot(q,(snap)=>{

      const msgs = snap.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))

      setMessages(msgs)

      setTimeout(()=>{
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior:"smooth"
        })
      },50)

    })

    return ()=>unsub()

  },[])


  // Typing
  const handleChange = async (e)=>{

    const value = e.target.value

    setText(value)
    setCursorPos(e.target.selectionStart)

    await setDoc(sharedDocRef,{
      text:value
    },{merge:true})

  }


  // Copy command
  const copyCommand = (cmd)=>{
    navigator.clipboard.writeText(cmd)
  }


  // Execute command
  const submit = async ()=>{

    const command = text.trim()

    if(!command) return

    if(command === "cd output"){
      navigate("/output")
      setText("")
      setCursorPos(0)
      return
    }

    if(command === "cd input"){
      navigate("/input")
      setText("")
      setCursorPos(0)
      return
    }

    await addDoc(collection(db,"inputs"),{
      text:command,
      created:serverTimestamp()
    })

    setText("")
    setCursorPos(0)

  }


  return (

    <div
      style={{
        background:"#000",
        color:"#fff",
        fontFamily:"Consolas, monospace",
        width:"100vw",
        height:"100vh",
        padding:"20px",
        overflow:"hidden"
      }}
      onClick={()=>inputRef.current.focus()}
    >

      <div
        ref={terminalRef}
        style={{
          width:"100%",
          height:"100%",
          overflowY:"auto",
          fontSize:"18px",
          lineHeight:"1.6",
          whiteSpace:"pre-wrap",
          wordBreak:"break-word"
        }}
      >

        {/* Static terminal text */}

        {staticLines.map((line,i)=>(
          <div key={i} style={{opacity:0.7}}>
            {line}
          </div>
        ))}

        {/* Command history */}

        {messages.map(msg => (

          <div key={msg.id} style={{whiteSpace:"pre-wrap"}}>
            <span style={{opacity:0.7}}>
            enjoy@terminal:~
            <span
              style={{
                cursor:"pointer",
                userSelect:"none"
              }}
              title="Copy command"
              onClick={()=>copyCommand(msg.text)}
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
            enjoy@terminal:~
            <span
              style={{
                cursor:"pointer",
                userSelect:"none"
              }}
              title="Copy command"
              onClick={()=>copyCommand(text)}
            >
              $
            </span>
          </span>{" "}

          {text.slice(0,cursorPos)}

          <span style={{animation:"blink 1s step-start infinite"}}>█</span>

          {text.slice(cursorPos)}

        </div>

      </div>


      {/* Hidden input */}

      <input
        ref={inputRef}
        value={text}
        onChange={handleChange}
        onKeyUp={(e)=>{
          setCursorPos(e.target.selectionStart)
        }}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            e.preventDefault()
            submit()
          }
        }}
        style={{
          position:"absolute",
          left:"-9999px"
        }}
        autoFocus
      />


      {/* Cursor animation */}

      <style>
        {`
        @keyframes blink {
          50% { opacity: 0; }
        }
        `}
      </style>

    </div>

  )

}