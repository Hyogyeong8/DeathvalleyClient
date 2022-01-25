import {useEffect, useState} from 'react';
import axios from 'axios';

export default function ApiResponse(){
  const [cnt, setCnt] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    console.log('hahaha', cnt);

    // setTimeout(()=>{
    //   alert('haha!');
    // }, 2000)

  }, [cnt])

  useEffect(() => {
    axios.get('https://api.ringleplus.com/api/v4/student/landing/course?locale=en')
  .then(function (response) {
    // handle success
    console.log(response.data);
    setCategories(response.data.categories); 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    // alert('somehthing went wrong');
    // setError(error.toSring())
  })  
  }, [])

  return <div>
    <button onClick = {e => setCnt(cnt => cnt+1)}>
      ++
    </button>
    <br/>
    {cnt}
    {categories.map((category, index)=>{
      return <div key={index}>
        {category.title}
        {category.courses.map((course, index)=>{
          return <div key={course.id}>
            {course.title}
            <br/>
            {course.subtitle}
            <br/>
            <img src={course.image_url} style={{width:300, height: 150}}/>
          </div>
        })}
      </div>
    })}
  </div>
}