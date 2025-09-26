import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

function Navigation({setShowSubscribe}) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  // Escape key to close search
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/movies">Flimpire</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left links */}
          <Nav className="me-auto">
            <Nav.Link href="/movies">Home</Nav.Link>
            <Nav.Link href="/series">Series</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right icons */}
          <Nav className="ms-auto align-items-center">
            {/* Search box + icon */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {showSearch && (
                <Form
                  className="me-2"
                  style={{ minWidth: "220px" }}
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

              {/* Search icon toggler */}
              <Nav.Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSearch((prev) => !prev);
                }}
              >
                <i className="bi bi-search" style={{ fontSize: "1.2rem" }}></i>
              </Nav.Link>
            </div>

            {/* Bell/Wishlist */}
            <Nav.Link href="#wishlist">
              <i className="bi bi-bell" style={{ fontSize: "1.2rem" }}></i>
            </Nav.Link>

            {/* User Dropdown */}
            <NavDropdown
              title={
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>

            {/* Subscribe Button */}
            <Button variant="warning" onClick={()=>{setShowSubscribe(true)}}  className="ms-2">
              Subscribe Now
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
