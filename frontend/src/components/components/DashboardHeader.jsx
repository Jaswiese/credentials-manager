import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
/**
 * Dashboard header
 * Component uses bootstrap components and styling for layout and display
 * primary purpose to preserve a consistent display between layout views (credentials & users),
 * and offer navigation between them.
 * @returns dashboard header displaying user greeting, title, view users button
 */
function DashboardHeader() {
  const companyID = useSelector((state) => state.orgData.loggedUser.id);
  const adminRole = useSelector(
    (state) => state.orgData.loggedUser.roles.admin
  );
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-4">
          <h3>id: {companyID}</h3>
        </Col>
        <Col className="col-md-4">
          <h1>Dashboard</h1>
        </Col>
        <Col className="col-md-4">
          {adminRole ? (
            <button className="btn btn-primary" type="button">
              View users
            </button>
          ) : (
            <div>
              <h1>🐱‍👓</h1>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardHeader;
