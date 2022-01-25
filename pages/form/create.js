import axios from 'axios';
import {useState} from 'react'

export default function Create() {
  const [btnState, setBtnState] = useState(false);

  const toggle = ()=> {
    // setBtnState(prev => !prev)
    setBtnState(!btnState)
  }

  const updateFormTitle = (text)=>{
    const cp = {...form}
    cp.title = text
    setForm(cp)
  }

  const updateFormDesc = (text) => {
    const cp = {...form}
    cp.desc = text
    setForm(cp)
  }

  const [questions, setQuestions] = useState([
    {
      qType: "radio",
      title: "question-title",
      desc: "radio-description",
      options: [
        {
          title: "option-title",
          desc: "option-description"
        },
        {
          title: "option2-title",
          desc: "option2-description"
        }
      ]
    },
    {
      qType: "checkbox",
      title: "question-title",
      desc: "checkbox-description",
      options: [
        {
          title: "option-title",
          desc: "option-description"
        },
        {
          title: "option2-title",
          desc: "option2-description"
        }
      ]
    },
    {
      qType: "text",
      title: "question-title",
      desc: "text-description",
      options: []
    }
  ]);

  const [form, setForm] = useState({
    title: "form-title",
    desc: "form-description",
    question: questions,
  })

  const updateQuestionTitle = (index, text) => {
    const cp = [...questions]
    cp[index].title = text
    setQuestions(cp);
  }

  const addOptionToQuestions = (index) => {
    const cp = [...questions]
    cp[index].options.push({title: "default"})
    setQuestions(cp)
  }

  const updateQuestionType = (index, qType) => {
    const cp = [...questions]
    cp[index].qType = qType
    setQuestions(cp)
  }

  const updateOption = (index, opIndex, text) => {
    const cp = [...questions]
    cp[index].options[opIndex].title = text
    setQuestions(cp)
  }

  const deleteOption = (index, opIndex) => {
    const cp = [...questions]
    cp[index].options.splice(opIndex, 1)
    setQuestions(cp)
  }

  const addQuestion = () => {
    const cp = [...questions]
    cp.push({
      qType: "radio",
      title: "question-title",
      desc: "radio-description",
      options: [
        {
          title: "option-title",
          desc: "option-description"
        },
        {
          title: "option2-title",
          desc: "option2-description"
        }
      ]
    })
    setQuestions(cp)
  }

  const deleteQuestion = (index) => {
    const cp = [...questions]
    cp.splice(index, 1)
    setQuestions(cp)
  }

  const submit = () => {
    axios.post("https://kimdiana.com/googleform/create", form)
    .then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error)
    });
    
  }

  return (

    <div>
      <textarea value={form.title} onChange={e=>updateFormTitle(e.target.value)}></textarea>
      <br/>
      <textarea value={form.desc} onChange={e=>updateFormDesc(e.target.value)} style = {{marginBottom: 20}}></textarea>
      {questions.map((question, index) => {
        return <Question 
        key={index}
        question={question} 
        index={index} 
        updateQuestionTitle={updateQuestionTitle}
        addOptionToQuestions={addOptionToQuestions}
        updateQuestionType={updateQuestionType}
        updateOption={updateOption}
        deleteOption={deleteOption}
        deleteQuestion={deleteQuestion}/>
      })
      }
      <button onClick={e=>addQuestion()}>question add</button>
      <br/>
      <button onClick={e=>submit()} style={{marginBottom: 30}}>Submit!!</button>
    </div>
  )
}

const Question = ({question, index, updateQuestionTitle, addOptionToQuestions, updateQuestionType, updateOption, deleteOption, deleteQuestion}) => {
  return <div style={{marginBottom: 40}}>
    Title: 
    <textarea value={question.title} onChange={e=>updateQuestionTitle(index, e.target.value)}></textarea>
    {/* Description: <textarea value={question.desc} onChange={e=>updateQuestionTitle(e.target.value)}></textarea> */}
    <select value={question.qType} onChange ={e=> updateQuestionType(index, e.target.value)}>
      <option value="radio">radio</option>
      <option value="checkbox">checkbox</option>
      <option value="text">text</option>
    </select>
    <button onClick = {e => deleteQuestion(index)}>X</button>
    {
      (question.qType === "radio" || question.qType === "checkbox") &&
      <>
      <br/>
      <span>Options</span>
      {
        question.options.map((option, opIndex) => {
          return <div key={opIndex}>
            <textarea value= {option.title} onChange = {e => updateOption(index,opIndex,e.target.value)}/> 
            <button onClick = {e => deleteOption(index, opIndex)}>X</button>
            {/* {option.desc} */}
          </div>
        })
      }
      <button onClick = {e => addOptionToQuestions(index)} >option add</button>
      </>
    }
  </div>
  
}
