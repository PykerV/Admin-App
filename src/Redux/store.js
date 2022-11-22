import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './createSlice.js';

export default configureStore({
    reducer: {
        panel: rootReducer
    }
}) 