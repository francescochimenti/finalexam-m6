import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="navbar fw-bold p-4">
      <Container fluid>
        <Navbar.Brand href="/">NatureNotes</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='border-0' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
          </Nav>
          <Nav.Link href="/new">Create new Post</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;