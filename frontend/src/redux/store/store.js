import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from '../features/homepageSlice';
import userReducer from '../features/userSlice';
import orgDataReducer from '../features/orgUnitSlice';
import dashboardReducer from '../features/dashboardSlice';

export default configureStore({
  reducer: {
    homepage: homepageReducer,
    user: userReducer,
    orgData: orgDataReducer,
    dashboard: dashboardReducer,
  },
});
