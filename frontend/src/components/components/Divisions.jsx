import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Credential from './Credential';

function Divisions({ unitName, divisions, isArrNotEmpty }) {
  const orgName = unitName;
  const { divisionName } = divisions;
  const credentialsArr = divisions.credentials;
  let key = 0;
  return (
    <Container fluid>
      <Row className="division-name-container">
        <h5 className="division-name">{divisionName}</h5>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-md-12 credentials-container">
          {isArrNotEmpty(credentialsArr) &&
            credentialsArr.map((creds) => (
              <Credential
                key={`${creds.id}${(key += 1)}`}
                serviceName={creds.serviceName}
                loginName={creds.loginName}
                divisionName={divisionName}
                unitName={orgName}
                password={creds.password}
                id={creds._id}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}

Divisions.propTypes = {
  unitName: PropTypes.string.isRequired,
  divisions: PropTypes.object.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default Divisions;
