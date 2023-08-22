'use client'
import { AppTable } from '@/components'
import { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:8000/blogs')
			const data = await res.json()
			console.log(data)
		}

		fetchData()
	}, [])

	return (
		<main>
			<AppTable />
		</main>
	)
}
