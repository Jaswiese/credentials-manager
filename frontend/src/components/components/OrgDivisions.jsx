import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import OrganisationalUnit from './OrganisationalUnit';

function OrgDivisions() {
  const orgData = useSelector((state) => state.orgData.orgUnits);
  const dataStatus = useSelector((state) => state.orgData.status);
  const dataError = useSelector((state) => state.orgData.error);

  const displayOrgUnits = (status) => {
    if (status === 'pending' || status === '' || status === undefined) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'rejected') {
      return <h4> {`${dataError}`}</h4>;
    }
    if (status === 'success') {
      const arrOfOrgUnits = orgData;
      let key = 0;
      return (
        <>
          {arrOfOrgUnits.map((orgUnit) => (
            <OrganisationalUnit name={orgUnit.unitName} key={(key += 1)} />
          ))}
        </>
      );
    }
    return <h4> {`${dataError}`}</h4>;
  };
  const displayDivisions = (status) => {
    if (status === 'pending' || status === '' || status === undefined) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'rejected') {
      return <h4> {`${dataError}`}</h4>;
    }

    if (status === 'success') {
      const arrOfOrgUnits = orgData;
      const arrOfDivision = [];
      for (let i = 0; i < arrOfOrgUnits.length; i+=1) {
        
      }
    }
    return <h4> {`${dataError}`}</h4>;
  }
  return (
    <Container fluid className="pt-5">
      <Row>
        <Col className="col-md-12">
          <h4>Organisational Units</h4>
          {displayOrgUnits(dataStatus)}
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="col-md-12">
          <h4>Divisions</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default OrgDivisions;
