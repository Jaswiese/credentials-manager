import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  orgUnits: null,
  status: '',
  error: null,
  loggedUser: null,
  actions: 0,
};

export const getOrgData = createAsyncThunk('orgData/getOrgData', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('units/divisions', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
    const result = response.json();
    return result;
  } catch (err) {
    return err;
  }
});

export const orgDataSlice = createSlice({
  name: 'orgData',
  initialState,
  reducers: {
    setDefault: () => initialState,
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    setActions: (state) => {
      state.actions += 1;
    },
  },
  extraReducers: {
    [getOrgData.pending]: (state) => {
      state.status = 'loading';
    },
    [getOrgData.fulfilled]: (state, action) => {
      state.status = 'success';
      state.orgUnits = action.payload;
    },
    [getOrgData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { setDefault, setLoggedUser, setActions } = orgDataSlice.actions;

export default orgDataSlice.reducer;
