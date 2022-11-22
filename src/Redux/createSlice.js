import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    users: [
        {
            firstname: 'John',
            lastname: 'Stewart',
            birthdate: '1991/01/13',
            idnumber: '4980011111',
            phonenumber: '4980011111',
            image: 'John.jpg',
            address: '',
            verified: false,
            selected: false,
            id: uuidv4()
        },
        {
            firstname: 'Jack',
            lastname: 'Stewart',
            birthdate: '1991/01/13',
            idnumber: '4980011112',
            phonenumber: '4980011112',
            image: 'Jack.jpg',
            verified: false,
            selected: false,
            address: '',
            id: uuidv4()   
        },
        {
            firstname: 'Natalia',
            lastname: 'Gomez',
            birthdate: '1986/06/06',
            idnumber: '4980011112',
            phonenumber: '4980011112',
            image: 'Natalia.jpg',
            verified: true,
            selected: false,
            address: '',
            id: uuidv4()
        }
    ],
    allSelected: false,
    modifiedUsers: [],
    isModified: false,
    searched: [],
    isSearch: false,
    hasDelete: false,
    edit: false,
    editUserData: [],
    check: false,
    checkUserData: [],
}

const mainSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        addNewUser(state, action) {
           return {
            ...state,
            users: [...state.users, action.payload],
            modifiedUsers: [...state.modifiedUsers, action.payload],
            isSearch: false
           }
        },
        selectAll(state) {
            state.allSelected = !state.allSelected
            state.isModified = false;
            state.isSearch = false;

            if(state.users.length > 0) {
                state.hasDelete = true;
            }
            state.users.forEach(x => {
                if(state.allSelected) {
                   x.selected = true
                }
                else if(!state.allSelected) {
                   x.selected = false
                   state.hasDelete = false;
                }
           })
        },
        selectedUser(state, action) {
            state.modifiedUsers = [...state.users];
            state.isSearch = false;
            state.isModified = true;
            
            let selected = state.modifiedUsers.filter(x => x.id === action.payload);
            selected[0].selected = !selected[0].selected;

            let check = state.modifiedUsers.some(x => x.selected === true);
            if(check) {
                state.modifiedUsers.sort((a, b) => Number(b.selected) - Number(a.selected))
                state.hasDelete = true;
            }
            else {
                state.users
                state.hasDelete = false;
            }
        },
        searchResult(state, action) {
            let temp = state.users.filter(x => x.lastname.toLowerCase().includes(action.payload) || x.firstname.toLowerCase().includes(action.payload))
            let pin = state.modifiedUsers.filter(x => x.selected === true)
            state.isSearch = true;

            if(pin.length === 0 || temp.length === 0) {
                state.searched = [...pin, ...temp]
            }
            else if(pin[0].firstname === temp[0].firstname) {
                state.searched = [...pin]
            }
            else {
                state.searched = [...pin, ...temp]
            }
        },
        deleteUser(state) {
          state.hasDelete = false;
          state.allSelected = false;

          let temp = state.modifiedUsers.filter(x => x.selected === false);
          let temp2 = state.users.filter(x => x.selected === false);
          state.modifiedUsers = temp;
          state.users = temp2;
        },
        editMode(state, action) {
            let temp = state.users.filter(x => x.id === action.payload)
            state.editUserData = temp;
            state.edit = true;
        },
        editUser(state, action) {
            let temp = state.users.filter(x => x.id !== action.payload.id)
            let index = state.users.findIndex(x => x.id === action.payload.id)
            state.users.splice(index, 1)
            state.users = [action.payload, ...temp]

            state.modifiedUsers.splice(index, 1)
            state.modifiedUsers = [action.payload, ...temp]
            state.edit = false;
        },
        closeEdit(state) {
            state.edit = false;
        },
        checkMode(state, action) {
            state.check = true;
            let temp = state.users.filter(x => x.id === action.payload)
            state.checkUserData = temp;
        },
        checkUser(state, action) {
            state.modifiedUsers = [...state.users];
            let index = state.users.findIndex(x => x.id === action.payload[0].id)
            let index2 = state.modifiedUsers.findIndex(x => x.id === action.payload[0].id)
            
            if(action.payload[0].firstname &&
               action.payload[0].lastname &&
               action.payload[0].birthdate &&
               action.payload[0].idnumber &&
               action.payload[0].phonenumber &&
               action.payload[0].image &&
               action.payload[0].address
            ) {
                state.users[index].verified = true;
                state.modifiedUsers[index2].verified = true;
                state.check = false;
            }
            else {
                state.check = false;
            }
        },
        closeCheck(state) {
            state.check = false;
        }
    }
})

export const { 
    addNewUser, 
    selectAll, 
    selectedUser, 
    searchResult, 
    deleteUser, 
    editMode, 
    editUser, 
    closeEdit,
    checkMode,
    checkUser,
    closeCheck 
} = mainSlice.actions;

export default mainSlice.reducer;