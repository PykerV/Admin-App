import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/components/CheckUser.module.scss';
import { checkUser, closeCheck } from '../src/Redux/createSlice';

export default function CheckUser() {

    const { checkUserData } = useSelector(state => state.panel)

    const [firstCheck, setFirstCheck] = useState(null);
    const [lastCheck, setLastCheck] = useState(null);
    const [phoneCheck, setPhoneCheck] = useState(null);
    const [idCheck, setIdCheck] = useState(null);
    const [birthCheck, setBirthCheck] = useState(null);
    const [addCheck, setAddCheck] = useState(null);
    const [picCheck, setPicCheck] = useState(null);
    
    const dispatch = useDispatch();


    function handleSave() {
        const data = [{
            firstname: firstCheck,
            lastname: lastCheck,
            birthdate: birthCheck,
            idnumber: idCheck,
            phonenumber: phoneCheck,
            image: picCheck,
            address: addCheck,
            id: checkUserData[0].id
        }]
        dispatch(checkUser(data))
    }
    function handleBack() {
        dispatch(closeCheck());
    }
 
    return (
        <div className={styles.AddUser}>
            <div className={styles.Info}>
                <div className={styles.KeyInfo}>
                    <label>Firstname:</label>
                    <label>Lastname:</label>
                    <label>Phone Number:</label>
                    <label>ID Number:</label>
                    <label>Birthdate:</label>
                    <label>Address:</label>
                    <label>Profile Pic:</label>
                </div>
                <div className={styles.ValueInfo}>
                    <label>{checkUserData[0].firstname}</label>
                    <label>{checkUserData[0].lastname}</label>
                    <label>{checkUserData[0].phonenumber}</label>
                    <label>{checkUserData[0].idnumber}</label>
                    <label>{checkUserData[0].birthdate}</label>
                    <label>{checkUserData[0].address}</label>
                    <img 
                        src={checkUserData[0].image ? checkUserData[0].image : "Camera.png"} 
                        style={{ margin: '0', width: '100px', height: '130px' }}/>
                </div>
                <div className={styles.decideCheck}>
                    <div className={firstCheck === true ? styles.AccFirst : firstCheck === false ? styles.RejFirst : ''}>
                        <img onClick={() => setFirstCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setFirstCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={lastCheck === true ? styles.AccLast : lastCheck === false ? styles.RejLast : ''}>
                        <img onClick={() => setLastCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setLastCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={phoneCheck === true ? styles.AccPhone : phoneCheck === false ? styles.RejPhone : ''}>
                        <img onClick={() => setPhoneCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setPhoneCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={idCheck === true ? styles.AccId : idCheck === false ? styles.RejId : ''}>
                        <img onClick={() => setIdCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setIdCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={birthCheck === true ? styles.AccBirth : birthCheck === false ? styles.RejBirth : ''}>
                        <img onClick={() => setBirthCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setBirthCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={addCheck === true ? styles.AccAdd : addCheck === false ? styles.RejAdd : ''}>
                        <img onClick={() => setAddCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setAddCheck(true)} src="Accepted.svg"/>
                    </div>
                    <div className={picCheck === true ? styles.AccPic : picCheck === false ? styles.RejPic : ''}>
                        <img onClick={() => setPicCheck(false)} src="Rejected.svg"/> 
                        <img onClick={() => setPicCheck(true)} src="Accepted.svg"/>
                    </div>
                </div>
            </div>
            <div className={styles.Buttons}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}