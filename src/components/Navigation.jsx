import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Link to="/" className="navbar-brand">Movie Library</Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
                            <NavDropdown titel="Movies" id="basic-nav-dropdown">
                                <NavLink to="/movies" className="dropdown-item">Filter Movies</NavLink>
                                <NavDropdown.Divider />
                                <NavLink to="/top-movies" className="dropdown-item">Top Movies</NavLink>
                                <NavLink to="/popular-movies" className="dropdown-item">Popular Movies</NavLink>
                                <NavLink to="/cinema-movies" className="dropdown-item">Cinema Movies</NavLink>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
