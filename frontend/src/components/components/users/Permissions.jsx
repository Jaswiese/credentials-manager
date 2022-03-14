import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserDivisions from './UserDivisions';
import { setUserActions } from '../../../redux/features/usersSlice';

function Permissions({ id, orgUnit, divisions, isArrNotEmpty }) {
  const randomNum = (min, max) => Math.random() * (max - min) + min;
  const dispatch = useDispatch();
  // local state declared for the org remove & add division functionality
  const [newDivision, setNewDivision] = useState('');
  const [divInput, toggleDivInput] = useState(false);

  const handleDivisionToggle = () => {
    toggleDivInput(!divInput);
  };

  const handleDivisionInput = (e) => {
    setNewDivision(e.target.value);
  };

  const handleDivisionAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
      division: newDivision,
    };
    try {
      const response = await fetch('user/assign/division', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(result.message);
        dispatch(setUserActions());
        toggleDivInput(!divInput);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOrgRemove = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
    };
    try {
      const response = await fetch('user/remove/org-unit', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(result.message);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Row className="org-unit-container">
        <Col className="col-md-6">
          <h5>Organisational Unit:</h5>
          <p>{orgUnit}</p>
        </Col>
        <Col className="col-md-6 align-items-center justify-content-center">
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleOrgRemove}
          >
            remove
          </button>
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 divisions-container">
        <h5>Divisions:</h5>
        {divInput ? (
          <>
            <input
              type="text"
              value={newDivision}
              onChange={handleDivisionInput}
            />
            <p className="text-muted">
              Either one of: management, finance, development, public relations,
              writing, security, research, admin, proofreaders
            </p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleDivisionAdd}
            >
              submit
            </button>
          </>
        ) : (
          <div className="add-division-button">
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleDivisionToggle}
            >
              add Division
            </button>
          </div>
        )}
      </Row>
      <Row className="justify-content-center pb-3">
        {isArrNotEmpty(divisions) &&
          divisions.map((div) => (
            <UserDivisions
              id={id}
              key={`${id}${randomNum(1, 249)}`}
              division={div.division}
              orgUnit={orgUnit}
            />
          ))}
      </Row>
    </>
  );
}

Permissions.propTypes = {
  id: PropTypes.string.isRequired,
  orgUnit: PropTypes.string.isRequired,
  divisions: PropTypes.array.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default Permissions;
