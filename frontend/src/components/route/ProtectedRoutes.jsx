import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import Homepage from '../pages/Homepage';
import { setLoggedUser } from '../../redux/features/orgUnitSlice';

export const authenticate = async () => {
  const token = localStorage.getItem('token');
  let result;
  try {
    const response = await fetch('auth/auth-check', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
    result = await response.json();
    if (result.status === 'ok') {
      return result;
    }
    return result;
  } catch (err) {
    alert(err);
    return err;
  }
};

function ProtectedRoutes() {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const isAuth = authenticate().then((data) => {
    if (data.status === 'ok') {
      setAuth(true);
      dispatch(setLoggedUser(data.data));
    }
    if (data.status === 'error') {
      setAuth(false);
    }
  });
  return auth ? <Outlet /> : <Homepage />;
}

export default ProtectedRoutes;
