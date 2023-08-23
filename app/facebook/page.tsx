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
			<div>This is facebook page</div>
			<Button variant='primary' onClick={handleButtonClick}>
				Back home
			</Button>
		</>
	)
}

export default Facebook
