import { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBar from "../components/SearchBar";
import EditUser from "../components/EditUser";
import CheckUser from '../components/CheckUser'
import styles from '../styles/Task.module.scss';
import Modal from '@mui/material/Modal';
import AddUser from "../components/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { selectAll, deleteUser } from "../src/Redux/createSlice";

export default function Task() {
    const [addMode, setAddMode] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1326);

    const { allSelected, hasDelete, edit, check } = useSelector(state => state.panel)
    const dispatch = useDispatch();
    
    useEffect(
        //  event listener for mui modal responsive 
        () => {
            function handleWindowResize() {
                setWindowWidth(window.innerWidth);
              }

            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        },
        []
    )

    function handleSelectAll() {
        dispatch(selectAll())
    }
    function handleDeleteUsers() {
        dispatch(deleteUser())
    }
    function handleAddUser() {
        setAddMode(true)
    }
    function handleClose() {
        setAddMode(false)
    }

    const desktopStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 500,
        bgcolor: 'background.paper',
        backgroundColor: '#F1F1F1',
        border: '1px solid #C2C0C0',
        borderRadius: 10,
        boxShadow: 24,
        p: 4,
      }
    const mobileStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 385,
        height: 550,
        bgcolor: 'background.paper',
        backgroundColor: '#F1F1F1',
        border: '1px solid #C2C0C0',
        borderRadius: 10,
        boxShadow: 24,
        p: 4,
      }

    return (
        <div className={styles.TaskContainer}>
            {addMode && 
                <Modal
                open={addMode}
                onClose={handleClose}
                >
                    <div style={windowWidth > 830 ? desktopStyle : mobileStyle}>
                        <AddUser back={handleClose} />
                    </div>
                </Modal>
            }
            {edit &&
                <Modal
                open={edit}
                onClose={handleClose}
                >
                    <div style={windowWidth > 830 ? desktopStyle : mobileStyle}>
                        <EditUser />
                    </div>
                </Modal>

            }
            {check &&
                <Modal
                open={check}
                onClose={handleClose}
                >
                    <div style={windowWidth > 830 ? desktopStyle : mobileStyle}>
                        <CheckUser />
                    </div>
                </Modal>

            }
                <SearchBar />
                <div className={styles.selectAll}>
                    <input type="checkbox" checked={allSelected} onChange={handleSelectAll}/>
                    {hasDelete && <img onClick={handleDeleteUsers} src="TrashCan.png"/>}
                </div> 
                <CardList />
                <div className={styles.AddButton}>
                    <button onClick={handleAddUser}>+</button>
                </div>
        </div>
    )
}