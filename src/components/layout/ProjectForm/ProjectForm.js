import styles from "./ProjectForm.module.css";
import Input from "../../form/Input";
import Select from "../../form/Select";
import SubmitButton from "../../form/SubmitButton";

import { useState, useEffect } from "react";


function ProjectForm({handleSubmit, projectData, btnText}) {

const [categories, setCategories] = useState([])
const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch('http://localhost:5000/categories',
    { 
    method: 'GET',
    headers:{'Content-Type' : 'application/json',},
  })
  .then((res) => res.json())
  .then((data) => {
    setCategories(data)
  })
  .catch((err) => console.log(err))
  }, [])

  
  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
    
  }

  const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value})
  }

  const handleCategory = (e) => {
    setProject({...project,
    category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    }})
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input
          type="text"
          text="Project Name"
          name="name"
          placeholder="Insert Project Name"
          handleOnChange={handleChange}
          value={project.name ? project.name : ''}
        />
      </div>
      <div>
        <Input
          type="number"
          text="Project Budget"
          name="budget"
          placeholder="Insert Project Budget"
          handleOnChange={handleChange}
          value={project.budget ? project.budget : ''}
        />
      </div>

      <Select 
      name="category_id" 
      text="Select Category" 
      options={categories}
      handleOnChange={handleCategory}
      value={project.category ? project.category.id : ''}/>

      <SubmitButton text={btnText}/>
    </form>
  );
}

export default ProjectForm;
