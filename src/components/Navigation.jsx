import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import "../scss/navigation.scss";

const Navigation = () => {
    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <Navbar.Brand>
                    <Link to="/" className="navbar-brand">Movie Library</Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
                            <NavLink to="/movies" className="dropdown-item">Filter Movies</NavLink>
                            <NavLink to="/top-movies" className="dropdown-item">Top Movies</NavLink>
                            <NavLink to="/popular-movies" className="dropdown-item">Popular Movies</NavLink>
                            <NavLink to="/cinema-movies" className="dropdown-item">Cinema Movies</NavLink>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
