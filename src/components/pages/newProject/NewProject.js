
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../layout/ProjectForm/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  const createPost = (project) => {
    //initialize cost and services
    project.cost = 0;
    project.service = [];

      fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(project),
      })
        .then((res) => res.json())
        .then((data) => {
          //redirect ------
          navigate('../projects',{message: 'Success! Project created'})
        })
        .catch((err) => console.log(err));
    
  };

  return (
    <div className={styles.newproject_container}>
      <h1>Create Project</h1>
      <p>Create your project and then add the services</p>
      <ProjectForm handleSubmit={createPost} btnText="Create Project" />
    </div>
  );
}

export default NewProject;
