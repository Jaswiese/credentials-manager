import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Role from './Role';
import Permissions from './Permissions';
import { setUserActions } from '../../../redux/features/usersSlice';

function User({ id, name, email, roles, permissions, isArrNotEmpty }) {
  const dispatch = useDispatch();
  // local state variable
  const [orgUnit, setOrgUnit] = useState('');
  const [toggleAddOrg, setToggleOrg] = useState(false);
  let key = 0;
  // handles user role change to user
  const handleSetUser = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: true,
        management: false,
        admin: false,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'ok') {
        alert(`${name} role set to user`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSetManagement = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: false,
        management: true,
        admin: false,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'ok') {
        alert(`${name} role set to management`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSetAdmin = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: false,
        management: false,
        admin: true,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'ok') {
        alert(`${name} role set to admin`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const addOrgUnit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
    };
    try {
      const response = await fetch('user/assign/org-unit', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(`${name} given permissions for ${orgUnit}`);
        dispatch(setUserActions());
        setToggleOrg(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOrgUnitChange = (e) => {
    setOrgUnit(e.target.value);
  };

  return (
    <Container fluid className="users-container-outer">
      <Row className="user-ui-outer">
        <Row className="p-1">
          <Col className="col-md-4">
            <h5>id:</h5> <p>{id}</p>
          </Col>
          <Col className="col-md-4">
            <h5>name:</h5> <p>{name}</p>
          </Col>
          <Col className="col-md-4">
            <h5>email:</h5> <p>{email}</p>
          </Col>
        </Row>
        <Row className="users-container-title">
          <h4 className="text-center">Roles:</h4>
        </Row>
        <Row className="justify-content-center p-3">
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetUser}
            >
              set User
            </button>
          </Col>
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetManagement}
            >
              set Management
            </button>
          </Col>
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetAdmin}
            >
              set Admin
            </button>
          </Col>
        </Row>
        <Row className="pb-5">
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.user}
              roleName="user"
            />
          )}
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.management}
              roleName="management"
            />
          )}
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.admin}
              roleName="admin"
            />
          )}
        </Row>
        <Row className="users-container-title">
          <h4>Permissions</h4>
        </Row>
        <Row className="add-org-button-container">
          <Col className="col-md-12">
            {toggleAddOrg ? (
              <>
                <input
                  type="text"
                  value={orgUnit}
                  onChange={handleOrgUnitChange}
                  placeholder="news management"
                />
                <p className="text-muted">
                  Either one of: news management, software reviews, hardware
                  reviews, opinion publishing
                </p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={addOrgUnit}
                >
                  submit
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setToggleOrg(!toggleAddOrg)}
              >
                add Organisational Unit
              </button>
            )}
          </Col>
        </Row>
        {isArrNotEmpty(permissions) &&
          permissions.map((perm) => (
            <Permissions
              key={`${id}${(key += 1)}`}
              id={id}
              orgUnit={perm.orgUnit}
              divisions={perm.divisions}
              isArrNotEmpty={isArrNotEmpty}
            />
          ))}
      </Row>
    </Container>
  );
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roles: PropTypes.shape({
    user: PropTypes.bool.isRequired,
    management: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
  permissions: PropTypes.array.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default User;
