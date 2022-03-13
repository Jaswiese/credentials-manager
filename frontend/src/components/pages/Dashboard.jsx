import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// application components
import DashboardHeader from '../components/DashboardHeader';
import Credentials from '../components/Credentials';
import Controls from '../components/Controls';
import AddCredential from '../components/AddCredential';
// redux actions
import { getOrgData } from '../../redux/features/orgUnitSlice';
// form ui styles
import '../../resources/css/formUI.css';

function Dashboard() {
  // dispatch variable assigned the useDispatch hook
  const dispatch = useDispatch();
  // action state sync with the useSelector hook
  const actionsStatus = useSelector((state) => state.orgData.actions);
  const dataStatus = useSelector((state) => state.orgData.status);
  const addFormStatus = useSelector((state) => state.dashboard.addComponent);
  /**
   * useEffect used to call the getOrgData on first,
   * and when there is a change in the actions state
   */
  useEffect(() => {
    dispatch(getOrgData());
  }, [actionsStatus]);

  const orgData = useSelector((state) => state.orgData.orgUnits);
  return (
    <Container fluid>
      <Row className="border-bottom">
        <DashboardHeader />
      </Row>
      {addFormStatus ? (
        <AddCredential />
      ) : (
        <Row className="pt-5">
          <Col className="col-md-8 border">
            <h3>Credentials</h3>
            {dataStatus === 'success' ? (
              <Credentials orgData={orgData} />
            ) : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Col>
          <Col className="col-md-4 border">
            <h3>Controls</h3>
            <Controls />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
