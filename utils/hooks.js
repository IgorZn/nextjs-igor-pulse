import { useCallback, useState } from 'react'
import { addRemoveBookmark } from './fetchMethods'

export const useHandleBookmark = id => {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const [message, setMessage] = useState('')

	const handleBookmark = useCallback(async () => {
		try {
			const res = await addRemoveBookmark(id)
			const data = await res.json()
			setIsBookmarked(data.isBookmarked)
			setMessage(data.message)
		} catch (error) {
			console.error('Error updating bookmark:', error)
			setMessage('Ошибка при обновлении закладки') // Обработка ошибок
		}
	}, [id])

	return { isBookmarked, setIsBookmarked, handleBookmark, message }
}
