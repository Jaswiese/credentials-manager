import React, { useState } from 'react';
// redux hooks
import { useDispatch } from 'react-redux';
// bootstrap components
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// redux actions
import { toggleAdd } from '../../redux/features/dashboardSlice';
import { setActions } from '../../redux/features/orgUnitSlice';

function AddCredential() {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // local state variables used for the form submission details
  const [orgUnit, setOrgUnit] = useState('');
  const [division, setDivision] = useState('');
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleOrgUnitChange = (e) => {
    setOrgUnit(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmission = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      orgUnit,
      division,
      credentials: {
        serviceName: service,
        loginName: login,
        password,
      },
    };
    try {
      const response = await fetch('units/add/credentials', {
        method: 'POST',
        headers: {
          authorization: `${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert('Successfully added credential');
        dispatch(setActions());
        dispatch(toggleAdd());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container fluid className="add-credentials-container">
      <Row className="justify-content-center p-5">
        <Col className="col-md-3 ui-form-outer">
          <Form className="p-5">
            <Form.Group className="mb-3" controlId="formOrgUnit">
              <Form.Label> Organisational Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="news management"
                onChange={handleOrgUnitChange}
              />
              <Form.Text className="text-muted">
                please enter one of: news management, software reviews, hardware
                reviews, opinion publishing
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDivision">
              <Form.Label> Division</Form.Label>
              <Form.Control
                type="text"
                placeholder="finance"
                onChange={handleDivisionChange}
              />
              <Form.Text className="text-muted">
                please enter one of: it, management, finance, development,
                public relations, writing, security, research, admin,
                proofreaders
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formService">
              <Form.Label> Service:</Form.Label>
              <Form.Control
                type="text"
                placeholder="github"
                onChange={handleServiceChange}
              />
              <Form.Text className="text-muted">
                please enter the name of the service
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginName">
              <Form.Label> Login name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="cooltechcode"
                onChange={handleLoginChange}
              />
              <Form.Text className="text-muted">
                please enter the login name used for the service
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label> Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="cooltechcode"
                onChange={handlePasswordChange}
              />
              <Form.Text className="text-muted">
                please enter the password used for the service
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmission}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCredential;
