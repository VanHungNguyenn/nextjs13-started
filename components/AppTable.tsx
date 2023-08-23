'use client'
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import CreateUpdateModal from './CreateUpdateModal'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface IProps {
	blogs: IBlog[]
}

const AppTable = ({ blogs }: IProps) => {
	const router = useRouter()

	const [showModalCreate, setShowModalCreate] = useState(false)
	const [mode, setMode] = useState<'create' | 'update' | ''>('')
	const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null)

	return (
		<>
			<div
				className='mb-3'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h3>Table Blogs</h3>
				<Button
					variant='primary'
					onClick={() => {
						setMode('create')
						setShowModalCreate(true)
					}}
				>
					Add new blog
				</Button>
			</div>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>No</th>
						<th>Title</th>
						<th>Author</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{blogs?.map((blog, index) => (
						<tr key={index}>
							<td>{blog.id}</td>
							<td>{blog.title}</td>
							<td>{blog.author}</td>
							<td>
								<Button variant='info'>
									<Link href={`/blogs/${blog.id}`}>View</Link>
								</Button>
								<Button
									variant='primary'
									className='mx-2'
									onClick={() => {
										setMode('update')
										setShowModalCreate(true)
										setSelectedBlog(blog)
									}}
								>
									Edit
								</Button>
								<Button variant='danger'>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<CreateUpdateModal
				mode={mode}
				showModal={showModalCreate}
				setShowModal={setShowModalCreate}
				initialData={
					selectedBlog
						? {
								id: selectedBlog.id,
								title: selectedBlog.title,
								author: selectedBlog.author,
								content: selectedBlog.content,
						  }
						: undefined
				}
			/>
		</>
	)
}

export default AppTable
