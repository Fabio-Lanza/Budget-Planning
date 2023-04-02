import styles from "./EditProject.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layout/container/Container";
import ProjectForm from "../../layout/ProjectForm/ProjectForm";
import ServiceForm from "../../Service/ServiceForm";
import ServiceCard from "../../Service/ServiceCard";
import { parse, v4 as uuidv4 } from "uuid";

function EditProject() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message1, setMessage1] = useState();
  const [message2, setMessage2] = useState();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setMessage1('')
      })
      .catch((err) => console.log(err));
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const removeService = (id, cost) => {
    const servicesUpdated = project.service.filter((service) => service.id !== id)

    const projectUpdated = project
    projectUpdated.service = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectUpdated),
    })
    .then((res) => res.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated)   
      })
      .catch((err) => console.log(err));
  };

  const createService = (project) => {
    const lastService = project.service[project.service.length - 1];

    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage2('Cost is greater than Budget');
      project.service.pop();
      return false;
    }
    //add service cost to project total cost
    project.cost = newCost;

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setServices(data.service);
        setShowServiceForm(false)
        setMessage2("");
        setMessage1("");
     
      })
      .catch((err) => console.log(err));
  };

  const editPost = (project) => {

    //budget validation
    if (project.budget < project.cost) {
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage1("Project Updated!");
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className={styles.project_details}>
      <Container customClass="column">
        <div className={styles.details_container}>
          <h1>
            Project Name : <span>"{project.name}"</span>
          </h1>
          <button className={styles.btn} onClick={toggleProjectForm}>
            {!showProjectForm ? "Edit Project" : "Close"}
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Project Id: </span>
                {project.id}
              </p>
              <p>
                <span>Category: </span>
                {project.category?.name}
              </p>
              <p>
                <span>Total Budget: </span>${project.budget}
              </p>
              <p>
                <span>Total Cost: </span>
                ${project.cost}
              </p>
              <div className={styles.message}>
                {message1 ? "Project Updated!" : ""}
              </div>
            </div>
          ) : (
            <div className={styles.project_info}>
              <ProjectForm
                handleSubmit={editPost}
                btnText="Done"
                projectData={project}
              />
            </div>
          )}
        </div>

        <div className={styles.service_form_container}>
          <h2>Add Services :</h2>
          <button className={styles.btn} onClick={toggleServiceForm}>
            {!showServiceForm ? "Add Service" : "Close"}
          </button>
          
          <div className={styles.project_info}>
            {showServiceForm && (
              <ServiceForm
                handleSubmit={createService}
                btnText="Add Service"
                projectData={project}
              />
            )}
            <div className={styles.message}>
            {message2 ? "Cost is greater than Budget" : ""}
            </div>
          </div>
        </div>
        <h2>Services</h2>
        <Container customClass="start">
          {services.length > 0 &&
            services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.Description}
                handleRemove={removeService}
              />
            ))}
          {services.length === 0 && <p>There is no services added</p>}
        </Container>
      </Container>
    </div>
  );
}

export default EditProject;
