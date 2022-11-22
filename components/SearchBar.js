import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchResult } from "../src/Redux/createSlice";
import styles from '../styles/components/SearchBar.module.scss';

export default function SearchBar() {

    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    function handleSumbitSearch() {
        if(value !== '') {
            dispatch(searchResult(value))
        }
    }
    return (
        <div className={styles.SearchBar}>
            <img onClick={handleSumbitSearch} src="/Vector.png"/>
            <input placeholder="جستجوی نام فرد" value={value} onChange={e => setValue(e.target.value)}/>
        </div>
    )
}