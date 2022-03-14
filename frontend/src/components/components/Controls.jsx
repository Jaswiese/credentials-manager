import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toggleAdd } from '../../redux/features/dashboardSlice';

function Controls() {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();

  const viewCredentials = useSelector((state) => state.dashboard.addComponent);

  const handleAddCredential = () => {
    dispatch(toggleAdd());
  };
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-12">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddCredential}
          >
            {viewCredentials ? 'view credentials' : 'add credential'}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Controls;
