import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

const MainNav = () => {
  const token = readToken();
  const router = useRouter();

  const [value, setValue] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const submitForm = async function (e) {
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${value}`));
    router.push(`/artwork?title=true&q=${value}`);
    setValue(" ");
  };
  const logout = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
    removeToken();
    router.push("/login");
  };

  return (
    <Navbar
      expanded={isExpanded}
      expand="lg"
      className="fixed-top navbar-dark bg-primary"
    >
      <Container>
        <Navbar.Brand>Yukti Manoj Mulani</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Home page */}
            <Link href="/" legacyBehavior passHref>
              <Nav.Link
                active={router.pathname === "/"}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </Nav.Link>
            </Link>

            {/* Search */}
            {token && (
              <Link href="/search" legacyBehavior passHref>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>
          {/* Form */}
          
          {token && (
            <Form className="d-flex gap-2" onSubmit={submitForm}>
              <Form.Control
                value={value}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={()=> setIsExpanded(false)} type="submit" variant="success">
                Search
              </Button>
            </Form>
          )}
          
          <Nav>
            {token && (
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/favourite"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {/* when a user isn't login */}
          {!token && (
            <Nav>
              {/* register */}
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/register"}
                  onClick={() => setIsExpanded(false)}
                >
                  Register
                </Nav.Link>
              </Link>
              {/* login */}
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/login"}
                  onClick={() => setIsExpanded(false)}
                >
                  Login
                </Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
