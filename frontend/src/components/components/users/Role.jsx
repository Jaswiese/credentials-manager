import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

function Role({ id, role, roleName }) {
  return (
    <Col className="col-md-4">
      <h5>
        {roleName}:{`${role}`}
      </h5>
    </Col>
  );
}

Role.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.bool.isRequired,
  roleName: PropTypes.string.isRequired,
};

export default Role;
