import axios from 'axios';
import {useState} from 'react';
import Cookies from 'js-cookie';

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

  const movePage = () => {
    window.location.href="./signUp"
  }

  const signIn = async () => {
    await axios.post("http://localhost:8000/users/login", user)
    .then(function(response){
      console.log(response)
      const result = response.data;
      if(result.success){
        cookies.set('jwtToken', result.token)
        alert("login success!")
      } else {
        alert(result.reason)
      }
    }).catch(function(error){
      console.log(error)
    });
  }

  return <div>
    <h1>Login Page</h1>
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
    <button onClick={signIn}>Login</button><br/>
    <button onClick={movePage}>Click to Sign Up</button>
  </div>
}