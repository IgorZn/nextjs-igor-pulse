import React from 'react'
import { usePathname } from 'next/navigation'
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, VKIcon, VKShareButton } from 'react-share'
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'

function ShareButtons(props) {
	const pathname = usePathname()
	const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${pathname}`

	return (
		<div className="flex w-full items-center justify-center rounded-full px-4 py-2">
			<VKShareButton url={shareUrl} className={'mr-1'}>
				<VKIcon size={32} round={true} />
			</VKShareButton>
			<TelegramShareButton url={shareUrl} className={'mr-1'}>
				<TelegramIcon size={32} round={true} />
			</TelegramShareButton>
			<EmailShareButton url={shareUrl} className={'mr-1'}>
				<EmailIcon size={32} round={true} />
			</EmailShareButton>
		</div>
	)
}

export default ShareButtons
