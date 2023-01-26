import { Card, Container, Row, Col } from 'react-bootstrap';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { LeftBar } from './Components/LeftBar';
import { MyIdentity } from './Pages/MyIdentity';
import { Settings } from './Pages/Settings';
import { Open } from './Pages/Open';
import { MainContext } from './Contexts/MainContext';
import { checkAuth } from './API/Common';
import { NotInstalledAlert } from './Components/NotInstalledAlert';

const Hello = () => {
  return (
    <div>
      <Card>
        <Card.Header>Welcome to DAOSys issues management app.</Card.Header>

        <Card.Body>
          <p>
            You can manage issues which is stored in Radicle network.
            <br />
            Before start please open existing project directory or enter project
            ID.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const runAuthCheck = () => {
      checkAuth()
        .then((authorized) => {
          setIsAuthorized(authorized);

          return true;
        })
        .catch((err) => {
          console.warn(`Failed to check auth: ${err}`);
        });
    };

    runAuthCheck();

    const timerCheck = setInterval(runAuthCheck, 1000 * 10);

    return () => {
      clearTimeout(timerCheck);
    };
  }, []);

  useEffect(() => {
    console.log(isAuthorized);
  }, [isAuthorized]);

  return (
    <MainContext.Provider value={{ isAuthorized }}>
      <Router>
        <Container className="mt-3" fluid>
          {!isAuthorized && (
            <>
              <NotInstalledAlert />
            </>
          )}
          <Row>
            <Col sm={3} md={3} xs={3}>
              <LeftBar />
            </Col>
            <Col sm={9} md={9} xs={9}>
              <Routes>
                <Route path="/" element={<Hello />} />
                <Route path="/open" element={<Open />} />
                <Route path="/me" element={<MyIdentity />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </MainContext.Provider>
  );
}
