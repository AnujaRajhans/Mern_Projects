import {useEffect } from "react";
import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const MyNavbar = ({ onToggleSidebar }) => {
  const [role, setRole] = useState("user");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setRole("user");
      }
    }
  }, [localStorage.getItem("token")]);

  const handleLogoClick = () => {
    navigate("/dashboard");
  };
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Navbar
      expand="lg"
      bg={role === "admin" ? "light" : "light"}
      variant={role === "admin" ? "light" : "light"}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll">
          <FaBars onClick={onToggleSidebar} />
        </Navbar.Toggle>
        <Navbar.Brand href="#" onClick={handleLogoClick}>
          <img
            src="https://e7.pngegg.com/pngimages/406/777/png-clipart-logo-shopping-cart-product-design-shopping-cart-angle-rectangle-thumbnail.png"
            height="40"
            alt="MDB Logo"
            loading="lazy"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {role === "admin" ? (
              <>
                <Nav.Link href="#">Admin Dashboard</Nav.Link>
                <Nav.Link href="#">Manage Users</Nav.Link>
                <Nav.Link href="#">Settings</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#">User Dashboard</Nav.Link>
                <Nav.Link href="#">Team</Nav.Link>
                <Nav.Link href="#">Projects</Nav.Link>
              </>
            )}
          </Nav>
          <Button variant="outline-success" onClick={logout}>
            LOGOUT
          </Button>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Nav.Link href="#">
            <FaShoppingCart className="text-reset me-3" />
          </Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle as="a" href="#" className="text-reset me-3">
              <FaRegBell />

            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Notifications</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <NavDropdown
            align="end"
            title={
              <img
                src="https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png"
                className="rounded-circle"
                height="25"
                alt="Avatar"
                loading="lazy"
              />
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#">My profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;