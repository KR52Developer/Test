// import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducer";


// export default configureStore(reducer);



import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
    reducer,
});

export default store;
