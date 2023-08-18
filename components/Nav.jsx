"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
	const isUserLoggedIn = true;
	const [toggleDropDown, setToggleDropDown] = useState(false);
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		}
		setProviders();
	}, [])
	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href="/" className='flex gap-2 flex-center'>
				<Image 
					alt='Promptopia Logo' 
					src="/assets/images/logo.svg"
					width={30}
					height={30}
					className='object-contain' 
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>

			{/* desktop nevigation*/}
			<div className='sm:flex hidden'>
				{isUserLoggedIn ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>

						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>

						<Link href="/profile">
							<Image src="/assets/images/logo.svg"
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers && 
							Object.values(providers).map((provider) => (
								<button 
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign In
								</button>
							))
						}
					</>
				)}
			</div>

			{/* mobile nevigation*/}
			<div className='sm:hidden flex relative'>
				{isUserLoggedIn? (
					<div className='flex'>
						<Image src="/assets/images/logo.svg"
							width={37}
							height={37}
							className='rounded-full'
							alt='profile'
							onClick={() => setToggleDropDown((prev) => !prev)}
						/>
						{/*toggle*/}
						{toggleDropDown && (
							<div className="dropdown">
								<Link
									href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
								>
									My Profile
								</Link>
							</div>
						)}
					</div>
				): (
					<>
						{providers && 
							Object.values(providers).map((provider) => (
								<button 
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign Up
								</button>
							))
						}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav