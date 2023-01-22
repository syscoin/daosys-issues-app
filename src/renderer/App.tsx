import { Card, Container, Row, Col } from 'react-bootstrap';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LeftBar } from './Components/LeftBar';
import { MyIdentity } from './Pages/MyIdentity';
import { Settings } from './Pages/Settings';
import { Open } from './Pages/Open';

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
  return (
    <Router>
      <Container className="mt-3" fluid>
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
  );
}
