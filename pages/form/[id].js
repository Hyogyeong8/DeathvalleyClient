import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import axios from 'axios';


export default function SurveyPage() {
  const router = useRouter()
  const {id} = router.query
  const [form, setForm] = useState({
    title: "",
    desc: "",
  })
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    if (id){
      getQuestions()
    }
  }, [id]);

  const getQuestions = async () => {
    await axios.get("http://localhost:8000/googleform/getQuestions", {
      params: {
        id: id
      }
    })
    .then(res => {
      setForm(res.data['form'])
      console.log(form)
      setQuestion(res.data['formquestion'])
    })
    .catch(err => console.log(err));
  }

  const submit = async () => {
    await readAnswer()
    if(answer.length !==0){
      console.log('answer: ', answer)
      await axios.post("http://localhost:8000/googleform/answer", answer)
      .then(function(response){
        console.log(response)
      }).catch(function(error){
        console.log(error)
      });
    }
    else console.log('length is 0')
  }

  useEffect(async ()=>{
    if(answer.length !==0){
      console.log('answer: ', answer)
      await axios.post("http://localhost:8000/googleform/answer", answer)
      .then(function(response){
        console.log(response)
      }).catch(function(error){
        console.log(error)
      });
    }
  }, [answer])

  const readAnswer = async () => {
    return new Promise(()=>{
      question.map(q=>{
        var docu = document.getElementsByName(q['id'].toString())
        if(q.qType==='text'){
          console.log("text value: ", docu[0].value)
          addAnswer(docu[0].value, q['id'])
        } else {
          var j=0
          while(j<docu.length){
            if(docu[j].checked){
              console.log("checked: ", docu[j].value)
              addAnswer(docu[j].value, q['id'])
            }
            j= j+1;
          }
        }
      })
    })
  }

  const addAnswer = (_value, index) => {
    // const cp = [...answer]
    // cp.push({
    //   qId: index,
    //   value: _value
    // })
    return new Promise(()=>{
      setAnswer(answer => [{
        qId: index,
        value: _value
      }, ...answer])
    })
    //console.log('after cp, answer is ', answer);
  }

  return <div>
    {form['title']}<br/>{form['desc']}<br/><br/>
    {question.length !== 0 && (
      question.map((q) => {
        return (
          <div key={q['id']}>
            {q['title']}<br/>{q['desc']}
            {q['qType']==='radio' && q['Options'].map((o, index)=>{
              return (
                <div key={o['id']}>
                  <input type="radio" id={index} name={q['id']} value={o['title']} checked></input>
                  <label for={index}>{o['title']}</label>
                </div>
              )
            })}
            {q['qType']==='checkbox' && q['Options'].map((o, index)=>{
              return (
                <div key={o['id']}>
                  <input type="checkbox" id={index} name={q['id']} value={o['title']} checked></input>
                  <label for={index}>{o['title']}</label>
                </div>
              )
            })}
            {q['qType']==='text' && (<div key={o['id']}><textarea name={q['id']}></textarea></div>)}
          </div>
        )
      })
    )}
    <br/>
    <button onClick = {()=>submit()} >Submit!!</button>
  </div>
}
