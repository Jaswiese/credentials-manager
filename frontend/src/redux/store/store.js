import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from '../features/homepageSlice';
import userReducer from '../features/userSlice';

export default configureStore({
  reducer: {
    homepage: homepageReducer,
    user: userReducer,
  },
});
