import Navbar from '@/components/Navbar'
import '@/assets/style/globals.css'
import SessionWrapper from '@/components/SessionWrapper'
import { MessageCountContextProvider } from '@/context/GlobalContext'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
	title: 'Igor Property Pulse',
	description: 'find your perfect hata',
	keywords: 'property,rental,search,find',
}

const MainLayout = ({ children, session }) => {
	return (
		<SessionWrapper session={session}>
			<MessageCountContextProvider>
				<html lang="en">
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<body>
						<ToastContainer />
						<Navbar />
						<div>{children}</div>
					</body>
				</html>
			</MessageCountContextProvider>
		</SessionWrapper>
	)
}

export default MainLayout
