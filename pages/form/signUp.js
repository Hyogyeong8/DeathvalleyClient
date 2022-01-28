import axios from 'axios'
import {useState} from 'react'

export default function Login(){
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const updateFirstName=(text)=>{
    const cp = {...user}
    cp.firstName = text
    setUser(cp)
  }

  const updateLastName=(text)=>{
    const cp = {...user}
    cp.lastName = text
    setUser(cp)
  }

  const updateEmail=(text)=>{
    const cp = {...user}
    cp.email = text
    setUser(cp)
  }

  const updatePassword=(text)=>{
    const cp = {...user}
    cp.password = text
    setUser(cp)
  }

  const register = async () => {
    const pwd = document.getElementById('pwd').value;
    if(user.password !== pwd){
      alert('패스워드가 다릅니다.');
    } else {
      await axios.post("https://kimdiana.com/users/create", user)
      .then(function(response){
        console.log(response)
        alert("회원가입이 완료되었습니다. ")
      }).catch(function(error){
        console.log(error)
      });
    }
  }

  const movePage = () => {
    window.location.href="./login"
  }

  return <div>
    <h1>Sign Up Page</h1>
    <div>
      Name<br/>
      <input value={user.firstName} onChange={e=>updateFirstName(e.target.value)} placeholder="first name"></input>
      <input value={user.lastName} onChange={e=>updateLastName(e.target.value)} placeholder="last name"></input>
    </div>
    <div>
      E-mail<br/>
      <input value={user.email} onChange={e=>updateEmail(e.target.value)}></input>
    </div>
    <div>
      Password<br/>
      <input type='password' value={user.password} onChange={e=>updatePassword(e.target.value)}></input>
    </div>
    <div>
      Password Confirm<br/>
      <input type='password' id="pwd"></input>
    </div>
    <button onClick={register}>Sign Up</button><br/>
    <button onClick={movePage}>Click to Login</button>
  </div>
}