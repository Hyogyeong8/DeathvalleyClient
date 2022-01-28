import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

export default function Survey() {

  const [forms, setForms] = useState([]);

  useEffect(() => axios.get("https://kimdiana.com/googleform/getForms", {

  })
  .then(res => {
    setForms(res.data)
  })
  .catch(err => console.log(err)), []);

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
