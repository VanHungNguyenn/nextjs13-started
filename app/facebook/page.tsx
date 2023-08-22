'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button'

const Facebook = () => {
	const router = useRouter()

	const handleButtonClick = () => {
		router.push('/')
	}

	return (
		<>
			<Button variant='primary'>VanHungNguyen</Button>
			<div>Facebook</div>
			<button onClick={handleButtonClick}>Back home</button>
		</>
	)
}

export default Facebook
