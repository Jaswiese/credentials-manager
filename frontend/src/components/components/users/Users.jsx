import React, { useEffect } from 'react';
// redux hooks
import { useSelector, useDispatch } from 'react-redux';
// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// local components
import User from './User';
// redux actions
import { getUsers } from '../../../redux/features/usersSlice';

function Users() {
  const dispatch = useDispatch();
  const usersActions = useSelector((state) => state.users.userActions);
  const usersDataStatus = useSelector((state) => state.users.status);
  const usersDataError = useSelector((state) => state.users.error);
  const usersData = useSelector((state) => state.users.data);

  const isArrNotEmpty = (arr) => {
    if (arr.length === 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(getUsers());
    console.log('fired useEffect');
  }, [usersActions]);

  const displayUsers = (status) => {
    if (status === 'pending' || status === '' || status === undefined) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'rejected') {
      return <h4> {`${usersDataError}`}</h4>;
    }
    if (status === 'success') {
      const userDataArr = usersData.data;
      return (
        <Col className="col-md-12">
          {isArrNotEmpty(userDataArr) &&
            userDataArr.map((userData) => (
              <User
                id={userData._id}
                key={userData._id}
                name={userData.name}
                email={userData.email}
                roles={userData.roles}
                permissions={userData.permissions}
                isArrNotEmpty={isArrNotEmpty}
              />
            ))}
        </Col>
      );
    }
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };

  return (
    <Container fluid className="pt-5">
      <Row className="justify-content-center align-content-center">
        <h2>Users</h2>
      </Row>
      <Row className="justify-content-center align-content-center pt-5">
        {displayUsers(usersDataStatus)}
      </Row>
    </Container>
  );
}

export default Users;
