import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Survey() {

  const [forms, setForms] = useState([]);

  useEffect(() => 
  axios.get("https://kimdiana.com/googleform/getForms", {
  })
  .then(res => {
    setForms(res.data)
  })
  .catch(err => console.log(err)), []);

  const valid = async () => {
    const accessToken = Cookies.get('jwtToken')
    await axios.post("http://localhost:8000/users/valid", {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(function(res){
      console.log(res)
      if(!res.data.success){
        alert("로그인을 해야합니다")
        window.location.href = "./login"
      }
    }).catch(function(error){
      console.log(error)
    });
  }

  useEffect(() => {
    valid();
  }, [])

  const movePage = (id) =>{
    window.location.assign(`./${id}`)
    // Router.push({
    //   pathname: `./${id}`,
    //   query: { id: id },
    // })
  }

  const moveToCreatePage = () => {
    window.location.href = "./create"
  }

  return (
    <div>
      {forms.map(form => {
        if(form.title){
          return (
            <div key={form['id']} style={{margin: 15}}>
              <button onClick={() => movePage(form['id'])}>{form['title']}</button> 
              <br />
              {form['desc']}
            </div>
          )
        }
      })}
      <button onClick={moveToCreatePage}>++ Create Form</button>
    </div>
  );
}
