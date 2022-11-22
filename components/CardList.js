import styles from '../styles/components/CardList.module.scss';
import Card from './Card';
import { useSelector } from 'react-redux';

export default function CardList() {
    const { users, modifiedUsers, isModified, searched, isSearch } = useSelector(state => state.panel)

    return (
        <div className={styles.CardList}>
            {(isSearch ? searched : isModified ? modifiedUsers : users).map(user => (
                <Card
                 firstName={user.firstname} 
                 lastName={user.lastname} 
                 image={user.image}
                 birthdate={user.birthdate}
                 idNumber={user.idnumber}
                 key={user.id}
                 id={user.id}
                 verified={user.verified}
                 selected={user.selected}
                 />
            ))}
        </div>
    )
}