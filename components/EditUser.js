import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/components/AddUser.module.scss';
import { editUser, closeEdit } from '../src/Redux/createSlice';

export default function EditUser() {

    const { editUserData } = useSelector(state => state.panel)

    const [firstName, setFirstName] = useState(editUserData[0].firstname);
    const [lastName, setLastName] = useState(editUserData[0].lastname);
    const [phoneNumber, setPhoneNumber] = useState(editUserData[0].phonenumber);
    const [idNumber, setIdNumber] = useState(editUserData[0].idnumber);
    const [birthdate, setBirthdate] = useState(editUserData[0].birthdate);
    const [address, setAddress] = useState(editUserData[0].address);
    const [profilePic, setProfilePic] = useState(editUserData[0].image);
    
    const dispatch = useDispatch();

    function handleProfilePic(e) {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    }
    function handleSave() {
        const data = {
            firstname: firstName,
            lastname: lastName,
            birthdate: birthdate,
            idnumber: idNumber,
            phonenumber: phoneNumber,
            image: profilePic,
            address: address,
            verified: false,
            selected: false,
            id: editUserData[0].id
        }
        dispatch(editUser(data))
    }
    function handleBack() {
        dispatch(closeEdit());
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
                    <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <input value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    <input value={idNumber} onChange={e => setIdNumber(e.target.value)}/>
                    <input value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
                    <input value={address} onChange={e => setAddress(e.target.value)}/>
                    <label htmlFor="imageUpload">
                        <img 
                        src={profilePic ? profilePic : "Camera.png"} 
                        style={profilePic && { margin: '0', width: '100px', height: '130px' }}/>
                    </label>
                    <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleProfilePic}/>
                </div>
            </div>
            <div className={styles.Buttons}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}