import styles from "./Projects.module.css";
import Container from "../../layout/container/Container";
import LinkButton from "../../layout/linkButton/LinkButton";

import ProjectCard from "./ProjectCard";
import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Success! Project Removed.");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to="/newproject" text="Create Project" />
      </div>
      <div className={styles.remove}>{projectMessage}</div>
      <Container customClass="start">
        {projects.length <= 0 && (
          <p className={styles.titleProject}>There is no Project created</p>
        )}
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              handleRemove={removeProject}
            />
          ))}
      </Container>
    </div>
  );
}

export default Projects;
