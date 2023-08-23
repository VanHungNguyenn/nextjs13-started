'use client'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface ICreateUpdateModalProps {
	showModal: boolean
	setShowModal: (showModal: boolean) => void
	mode: 'create' | 'update' | ''
	initialData?: {
		id?: number
		title: string
		author: string
		content: string
	}
}

const CreateUpdateModal = ({
	showModal,
	setShowModal,
	mode,
	initialData,
}: ICreateUpdateModalProps) => {
	const handleClose = () => {
		setShowModal(false)
		setTitle('')
		setAuthor('')
		setContent('')
	}

	const [title, setTitle] = useState<string>('')
	const [author, setAuthor] = useState<string>('')
	const [content, setContent] = useState<string>('')

	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title || '')
			setAuthor(initialData.author || '')
			setContent(initialData.content || '')
		} else {
			setTitle('')
			setAuthor('')
			setContent('')
		}
	}, [initialData])

	const handleSubmit = () => {
		if (!title || !author || !content) {
			toast.error(`Please fill in all fields!`)
			return
		}

		const url =
			mode === 'create'
				? 'http://localhost:8000/blogs'
				: `http://localhost:8000/blogs/${initialData?.id}`
		const method = mode === 'create' ? 'POST' : 'PUT'

		fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, author, content }),
		})
			.then((res) => {
				if (!res.ok) {
					return res.json().then((err) => Promise.reject(err))
				}
				return res.json()
			})
			.then((data) => {
				if (mode === 'create') {
					toast.success(`Create blog successfully!`)
				} else {
					toast.success(`Update blog successfully!`)
				}

				mutate('http://localhost:8000/blogs')
				handleClose() // Đóng modal
			})
			.catch((error) => {
				if (mode === 'create') {
					toast.error(`Create blog failed!`)
				} else {
					toast.error(`Update blog failed!`)
				}
				console.error(error)
			})
	}

	return (
		<>
			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				size='lg'
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{mode === 'create' ? 'Create' : 'Update'} Blog
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='...'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Author</Form.Label>
							<Form.Control
								type='text'
								placeholder='...'
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Content</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='...'
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={handleSubmit}>
						{mode === 'create' ? 'Create' : 'Update'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default CreateUpdateModal
