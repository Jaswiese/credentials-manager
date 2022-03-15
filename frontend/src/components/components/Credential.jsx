import React, { useState } from 'react';
// prop type validation
import PropTypes from 'prop-types';
// redux hooks
import { useDispatch, useSelector } from 'react-redux';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// redux actions imported
import { setActions } from '../../redux/features/orgUnitSlice';

function Credential({
  serviceName,
  loginName,
  divisionName,
  unitName,
  password,
}) {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // local state variables declared for edit functionality
  const [service, setService] = useState(serviceName);
  const [username, setUsername] = useState(loginName);
  const [passwordState, setPassword] = useState(password);
  const [serviceEdit, toggleServiceEdit] = useState(false);
  const [usernameEdit, toggleUsernameEdit] = useState(false);
  const [passwordEdit, togglePasswordEdit] = useState(false);
  // useSelector hook used to sync with redux store state values
  const management = useSelector(
    (state) => state.orgData.loggedUser.roles.management
  );
  const admin = useSelector((state) => state.orgData.loggedUser.roles.admin);
  const dataStatus = useSelector((state) => state.orgData.status);
  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      orgUnit: unitName,
      division: divisionName,
      targetServiceName: serviceName,
      credentials: {
        serviceName: service,
        loginName: username,
        password: passwordState,
      },
    };
    const response = await fetch('/units/edit/credentials', {
      method: 'PUT',
      headers: {
        authorization: `${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (result.status === 'ok') {
      alert(`Succesfully updated ${serviceName} `);
      dispatch(setActions());
    }
  };

  const editDisplayService = () => {
    if ((management || admin) && serviceEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => toggleServiceEdit(!serviceEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && serviceEdit) {
      return (
        <Row>
          <input type="text" value={service} onChange={handleServiceChange} />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };

  const editDisplayUsername = () => {
    if ((management || admin) && usernameEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => toggleUsernameEdit(!usernameEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && usernameEdit) {
      return (
        <Row>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };

  const editDisplayPassword = () => {
    if ((management || admin) && passwordEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => togglePasswordEdit(!passwordEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && passwordEdit) {
      return (
        <Row>
          <input
            type="password"
            value={passwordState}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };

  return (
    <div className="credentials-container-outer">
      <Row className="credentials-container-inner">
        <Col className="col-md-auto">
          <h5>Service: {serviceName}</h5>
          {dataStatus === 'success' && editDisplayService()}
        </Col>
        <Col className="col-md-auto">
          <h5>username: {loginName}</h5>
          {dataStatus === 'success' && editDisplayUsername()}
        </Col>
        <Col className="col-md-auto">
          <h5>password: {password}</h5>
          {dataStatus === 'success' && editDisplayPassword()}
        </Col>
      </Row>
    </div>
  );
}

Credential.propTypes = {
  serviceName: PropTypes.string.isRequired,
  loginName: PropTypes.string.isRequired,
  divisionName: PropTypes.string.isRequired,
  unitName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default Credential;
