import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import axios from 'axios';

const socket = io("http://localhost:8000")

export default function Home() {
  const [user, setUser] = useState("")
  const [msg, setMsg] = useState("")
  const [chatMsg, setChatMsg] = useState("")

  useEffect(()=>{
    
    console.log(socket)

    socket.on("connect", () => {
      console.log(socket.id)
    })

    socket.on('chat message', (msg) => {
      console.log('chat received')
      console.log(msg)
      setChatMsg(msg)
      setMsg("")
    })
  }, [])

  const emitData = () => {
    socket.emit('chat message', msg)
  }

  const loginPage = () => {
    window.location.href = "./form/login"
  }

  const formPage = () => {
    window.location.href = "./form/survey"
  }

  const valid = async () => {
    const accessToken = Cookies.get('jwtToken')
    await axios.post("http://localhost:8000/users/valid", {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function(res){
      console.log(res)
      if(res.data.success){
        
      }
    }).catch(function(error){
      console.log(error)
    });
  }

  useEffect(() => {
    valid();
  }, [])

  return (
    <div>
      Hi, this is Diana.<br/>
      <button onClick={e => loginPage()}>login</button>
      <button onClick={e => formPage()}>Form</button>
      <textarea onChange={e => setMsg(e.target.value)}></textarea>
      <button onClick = {e => emitData()}>emit data</button>
      <div>
        {chatMsg}
      </div>
    </div>
  )
}
