'use client'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<IBlog, string> = (url: string) =>
	fetch(url).then((res) => res.json())

const BlogDetail = ({ params }: { params: { id: string } }) => {
	const { data, error, isLoading } = useSWR(
		`http://localhost:8000/blogs/${params.id}`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	)

	if (isLoading) return <div>Loading...</div>

	if (error) return <div>Error...</div>

	if (!data) return <div>No data...</div>

	return (
		<>
			<Button variant='primary' className='mb-3'>
				<Link href='/blogs'>Go back blogs page</Link>
			</Button>
			<Card className='text-center'>
				<Card.Header>{data.title}</Card.Header>
				<Card.Body>
					<Card.Text>{data.content}</Card.Text>
				</Card.Body>
				<Card.Footer className='text-muted'>{data.author}</Card.Footer>
			</Card>
		</>
	)
}

export default BlogDetail
