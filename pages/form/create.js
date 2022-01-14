import {useState} from 'react'

export default function Create() {
  const [btnState, setBtnState] = useState(false);

  const toggle = ()=> {
    // setBtnState(prev => !prev)
    setBtnState(!btnState)
  }


  const [questions, setQuestions] = useState([
    {
      qType: "radio",
      title: "radio-title",
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
      title: "checkbox-title",
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
      title: "text-title",
      desc: "text-description",
      options: []
    }
  ]);

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

  return (

    <div>
      {questions.map((question, index) => {
        return <Question 
        question={question} 
        index={index} 
        updateQuestionTitle={updateQuestionTitle}
        addOptionToQuestions={addOptionToQuestions}
        updateQuestionType={updateQuestionType}
        updateOption={updateOption}/>
      })
      }
    </div>
  )
}

const Question = ({question, index, updateQuestionTitle, addOptionToQuestions, updateQuestionType, updateOption}) => {
  return <div style={{marginBottom: 40}}>
    Title: 
    <textarea value={question.title} onChange={e=>updateQuestionTitle(index, e.target.value)}></textarea>
    {/* Description: <textarea value={question.desc} onChange={e=>updateQuestionTitle(e.target.value)}></textarea> */}
    <select value={question.qType} onChange ={e=> updateQuestionType(index, e.target.value)}>
      <option value="radio">radio</option>
      <option value="checkbox">checkbox</option>
      <option value="text">text</option>
    </select>
  
    {
      (question.qType === "radio" || question.qType === "checkbox") &&
      <>
      <br/>
      <span>Options</span>
      {
        question.options.map((option, opIndex) => {
          return <div>
            <textarea value= {option.title} onChange = {e => updateOption(index,opIndex,e.target.value)}/> 
            {/* {option.desc} */}
          </div>
        })
      }
      <button onClick = {e => addOptionToQuestions(index)} >++add</button>
      </>
    }
  </div>
  
}
