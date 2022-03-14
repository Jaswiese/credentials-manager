import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { setUserActions } from '../../../redux/features/usersSlice';

function UserDivisions({ id, division, orgUnit }) {
  const dispatch = useDispatch();

  const handleDivisionRemove = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
      division,
    };
    try {
      const response = await fetch('user/remove/division', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
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
    <Col className="col-md-auto">
      <h5> division:</h5>
      <p>{division}</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={handleDivisionRemove}
      >
        remove
      </button>
    </Col>
  );
}
UserDivisions.propTypes = {
  id: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  orgUnit: PropTypes.string.isRequired,
};

export default UserDivisions;
