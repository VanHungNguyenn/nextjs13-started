'use client'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'

const Header = () => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Link className='navbar-brand' href='/'>
					Nextjs 13 + Bootstrap 5
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Link href='/' className='nav-link'>
							Home
						</Link>
						<Link href='/facebook' className='nav-link'>
							Facebook
						</Link>
						<Link href='/tiktok' className='nav-link'>
							Tiktok
						</Link>
						<Link href='/google' className='nav-link'>
							Google
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
