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

  return (
    <div>
      {forms.map(form => {
        return (
          <div key={form['id']} onClick={() => movePage(form['id'])}>
            {form['title']} 
            <br />
            {form['desc']}
          </div>
        )
      })}
    </div>
  );
}
