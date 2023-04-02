import styles from './Company.module.css'

function Company() {
  return (
      <section className={styles.company_container}>
      <h1>
        Welcome to <span>Costs</span>
      </h1>
      <p>Our company is a budget management service that helps
         people organize their finances and achieve their 
         Project financial goals. The company provides a user-friendly 
         platform where clients can track their income and 
         expenses and set budgets!</p>
      
    </section>
  
  )
}

export default Company