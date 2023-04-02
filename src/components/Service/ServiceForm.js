import styles from "../layout/ProjectForm/ProjectForm.module.css";
import { useState } from "react";
import SubmitButton from "../form/SubmitButton";
import Input from "../form/Input";

function ServiceForm({ handleSubmit, btnText, projectData }) {

  const [service, setService] = useState({})

  const submit = (e) => {
    e.preventDefault()
    projectData.service.push(service)
    handleSubmit(projectData)
  };

  const handleChange = (e) => {
    setService({...service,[e.target.name]: e.target.value})
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Service Name"
        name="name"
        placeholder="Insert Service Name"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Service Cost"
        name="cost"
        placeholder="Insert Total Cost"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Service Description"
        name="Description"
        placeholder="Insert Description"
        handleOnChange={handleChange}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
