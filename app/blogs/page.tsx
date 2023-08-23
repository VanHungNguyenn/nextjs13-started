'use client'
import { AppTable } from '@/components'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Blogs = () => {
	const { data, error, isLoading } = useSWR(
		'http://localhost:8000/blogs',
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
		<main>
			<AppTable
				blogs={data?.sort(
					(a: { id: number }, b: { id: number }) => b.id - a.id
				)}
			/>
		</main>
	)
}

export default Blogs
