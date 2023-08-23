'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Container from 'react-bootstrap/Container'
import { Footer, Header } from '@/components'
import { ToastContainer } from 'react-toastify'
const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={roboto.className}>
				<Header />
				<Container className='p-3'>{children}</Container>
				<Footer />
				<ToastContainer />
			</body>
		</html>
	)
}
