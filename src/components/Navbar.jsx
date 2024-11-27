'use client'
import Image from 'next/image'
import logo from '@/assets/images/logo-white.png'
import profileDefault from '@/assets/images/profile.png'
import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import CountMessagesNew from '@/components/CountMessagesNew'

function Navbar(props) {
	const { data: session } = useSession()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
	const [providers, setProviders] = useState(false)

	useEffect(() => {
		getProviders().then(data => setProviders(data))
	}, [])

	const pathName = usePathname()
	const bgGray900 = 'bg-gray-900 '
	const activeLink = (url, pathName, bg = 'bg-black ') => {
		return pathName === url ? bg : ''
	}

	return (
		<nav className="border-b border-blue-500 bg-blue-700">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-20 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
						{/*Mobile menu button*/}
						<button
							type="button"
							id="mobile-dropdown-button"
							className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<span className="absolute -inset-0.5"></span>
							<span className="sr-only">Open main menu</span>
							<svg
								className="block size-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>

					<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
						{/*Logo*/}
						<Link className="flex shrink-0 items-center" href="/">
							<Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />

							<span className="ml-2 hidden text-2xl font-bold text-white md:block">PropertyPulse</span>
						</Link>

						{/*Desktop Menu Hidden below md screens*/}
						<div className="hidden md:ml-6 md:block">
							<div className="flex space-x-2">
								<Link
									href="/"
									className={
										activeLink('/', pathName) +
										'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
									}>
									Home
								</Link>
								<Link
									href="/properties"
									className={
										activeLink('/properties', pathName) +
										'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
									}>
									Properties
								</Link>
								{session && (
									<Link
										href="/properties/add"
										className={
											activeLink('/properties/add', pathName) +
											'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
										}>
										Add Property
									</Link>
								)}
							</div>
						</div>
					</div>

					{/*Right Side Menu (Logged Out)*/}
					{!session && (
						<div className="hidden md:ml-6 md:block">
							<div className="flex items-center">
								{providers &&
									Object.values(providers).map(provider => (
										<button
											key={provider.name}
											onClick={() => signIn(provider.id)}
											className="flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
											<FaGoogle className={'mr-2 text-white'} />
											<span>Login or Register</span>
										</button>
									))}
							</div>
						</div>
					)}

					{/*Right Side Menu (Logged In)*/}
					{session && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
							{/*Notifications count*/}
							<CountMessagesNew session={session} />

							{/*Profile dropdown button*/}
							<div className="relative ml-3">
								<div>
									<button
										type="button"
										className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
										onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
										<span className="absolute -inset-1.5"></span>
										<span className="sr-only">Open user menu</span>
										<Image
											className="size-8 rounded-full"
											src={session.user.image || profileDefault}
											width={40}
											height={40}
											alt=""
										/>
									</button>
								</div>

								{/*Profile dropdown*/}
								<div
									id="user-menu"
									className={
										(isProfileMenuOpen ? 'block' : 'hidden') +
										' absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
									}
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabIndex="-1">
									<Link
										href="/profile"
										className={
											(isProfileDropdownOpen === 'Profile' ? 'bg-gray-100 ' : '') +
											'block px-4 py-2 text-sm text-gray-700'
										}
										role="menuitem"
										tabIndex="-1"
										onClick={() => setIsProfileMenuOpen(false)}
										onMouseEnter={() => setIsProfileDropdownOpen('Profile')}
										onMouseLeave={() => setIsProfileDropdownOpen(false)}
										id="user-menu-item-0">
										Your Profile
									</Link>
									<Link
										href="/properties/saved"
										className={
											(isProfileDropdownOpen === 'Saved Properties' ? 'bg-gray-100 ' : '') +
											'block px-4 py-2 text-sm text-gray-700'
										}
										role="menuitem"
										tabIndex="-1"
										onMouseEnter={() => setIsProfileDropdownOpen('Saved Properties')}
										onMouseLeave={() => setIsProfileDropdownOpen(false)}
										id="user-menu-item-2">
										Saved Properties
									</Link>
									<button
										className={
											(isProfileDropdownOpen === 'Sign Out' ? 'bg-gray-100 ' : '') +
											'block px-4 py-2 text-sm text-gray-700'
										}
										role="menuitem"
										tabIndex="-1"
										onClick={() => {
											signOut()
											setIsProfileDropdownOpen(false)
										}}
										onMouseEnter={() => setIsProfileDropdownOpen('Sign Out')}
										onMouseLeave={() => setIsProfileDropdownOpen(false)}
										id="user-menu-item-2">
										Sign Out
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/*Mobile menu, show/hide based on menu state.*/}
			<div className={isMobileMenuOpen ? 'block' : 'hidden'} id="mobile-menu">
				<div className="space-y-1 px-2 pb-3 pt-2">
					<Link
						href="/"
						className={
							activeLink('/', pathName, bgGray900) +
							'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
						}>
						Home
					</Link>
					<Link
						href="/properties"
						className={
							activeLink('/properties', pathName, bgGray900) +
							'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
						}>
						Properties
					</Link>
					{session && (
						<Link
							href="/properties/add"
							className={
								activeLink('/properties/add', pathName, bgGray900) +
								'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
							}>
							Add Property
						</Link>
					)}

					{!session && (
						<button
							className={
								'my-4 flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white'
							}>
							<FaGoogle className="mr-2" />
							<span> Login or Register</span>
						</button>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
