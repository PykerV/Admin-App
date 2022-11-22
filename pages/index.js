import styles from '../styles/Home.module.scss'
import Task from './Task';

function Home() {
  return (
    <div className={styles.container}>
      <Task />
    </div>
  )
}

export default Home;