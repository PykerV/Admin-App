import { useDispatch } from 'react-redux';
import { selectedUser, editMode, checkMode } from '../src/Redux/createSlice';
import styles from '../styles/components/Card.module.scss';

export default function Card({ image, firstName, lastName, birthdate, idNumber, verified, selected, id }) {

    const dispatch = useDispatch();

    function handleSelectedChange() {
        dispatch(selectedUser(id));
    }
    function handleEdit() {
        dispatch(editMode(id));
    }
    function handleCheckUser() {
        dispatch(checkMode(id));
    }
    return (
        <div className={styles.Card}>
            <div className={styles.CardTools}>
                <div>
                    <input type="checkbox" checked={selected} onChange={handleSelectedChange}/>
                    <button onClick={handleEdit} className={styles.EditButton}>
                        <img src="Edit.png"/>
                    </button>
                </div>
                {!verified && <button onClick={handleCheckUser} className={styles.CheckButton}>
                    Check
                </button>}
            </div>
            <div className={styles.CardDetails}>
                <img src={image}/>
                <div className={styles.CardInfo}>
                    <div>
                        <p>Firstname:</p> 
                        <p>Lastname:</p> 
                        <p>Birthdate:</p> 
                        <p>ID No:</p>
                        <span><img src={verified ? "Verified.svg" : "NotVerified.svg"}/></span>
                    </div> 
                    <div>
                        <label>{firstName}</label>
                        <label>{lastName}</label>
                        <label>{birthdate}</label>
                        <label>{idNumber}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}