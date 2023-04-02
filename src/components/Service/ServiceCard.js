import styles from "../pages/projects/ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, cost, description, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }


  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Total Cost :</span> ${cost}
      </p>
      <p>
       {description}
      </p>
      <div className={styles.actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Remove
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
