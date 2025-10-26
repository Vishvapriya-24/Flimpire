import { useState, useEffect } from "react";
import { useNavigate, NavLink,useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navigation({ setShowSubscribe, setShowSettings }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

    const handleOpenSettings = (e) => {
    e.preventDefault();
    navigate("/home/settings/account", { state: { from: location.pathname } });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setShowSearch(false);
    }
  };

  // Escape key closes search
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container fluid>
        {/* Small screen hamburger + brand */}
        <div className="d-flex align-items-center d-lg-none">
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="me-2" />
          <Navbar.Brand as={NavLink} to="/" className="fw-bold text-light mb-0">
            Flimpire
          </Navbar.Brand>
        </div>

        {/* Large screen brand */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-light d-none d-lg-block">
          Flimpire
        </Navbar.Brand>

        {/* Large screen Nav Links */}
        <Navbar.Collapse id="main-navbar" className="d-none d-lg-flex">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/home/series">Series</Nav.Link>
            <Nav.Link as={NavLink} to="/home/movies">Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/home/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Right Section (Always visible) */}
        <div className="d-flex align-items-center ms-auto">
          {/* Search box */}
          {showSearch && (
            <Form
              className="me-3"
              style={{ minWidth: "200px" }}
              onSubmit={handleSearchSubmit}
            >
              <InputGroup size="sm">
                <Form.Control
                  type="text"
                  placeholder="Search movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <Button type="submit" variant="primary">
                  Go
                </Button>
              </InputGroup>
            </Form>
          )}

          {/* Icons with spacing */}
          <Nav.Link
            href="#"
            className="me-3"
            onClick={(e) => {
              e.preventDefault();
              setShowSearch((prev) => !prev);
            }}
          >
            <i className="bi bi-search text-light" style={{ fontSize: "1.2rem" }}></i>
          </Nav.Link>

          <Nav.Link href="#wishlist" className="me-3">
            <i className="bi bi-bell text-light" style={{ fontSize: "1.2rem" }}></i>
          </Nav.Link>

          <NavDropdown
            title={<i className="bi bi-person-circle text-light" style={{ fontSize: "1.2rem" }}></i>}
            id="user-dropdown"
            align="end"
            className="me-3"
          >
            <NavDropdown.Item as={NavLink} to="/home/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item

              onClick={handleOpenSettings}
            >
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>

          <Button
            variant="warning"
            className="fw-semibold text-dark"
            onClick={() => setShowSubscribe(true)}
          >
            Subscribe
          </Button>
        </div>

        {/* Small Screen Drawer with reduced width */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className="d-lg-none"
          style={{ width: "250px" }}  
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" className="fw-bold">
              Flimpire
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/home/series">Series</Nav.Link>
              <Nav.Link as={NavLink} to="/home/movies">Movies</Nav.Link>
              <Nav.Link as={NavLink} to="/home/contact">Contact</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navigation;
