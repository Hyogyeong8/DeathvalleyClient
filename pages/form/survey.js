import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

export default function survey() {

  const [forms, setForms] = useState([]);

  useEffect(() => axios.get("http://localhost:8000/googleform/getForms", {

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
          <div onClick={() => movePage(form['id'])}>
            {form['title']} 
            <br />
            {form['desc']}
          </div>
        )
      })}
    </div>
  );
}
