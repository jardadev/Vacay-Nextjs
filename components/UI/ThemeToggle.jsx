'use client';
import { useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle({}) {
	useEffect(() => {
		[...document.querySelectorAll('[data-toggle-theme]')].forEach((el) => {
			el.addEventListener('click', toggleTheme);
		});

		return () =>
			[...document.querySelectorAll('[data-toggle-theme]')].forEach(
				(el) => el.removeEventListener('click', toggleTheme)
			);
	}, []);

	return (
		<div className='flex gap-2 h-6'>
			<MoonIcon />
			<input
				type='checkbox'
				className='toggle'
				data-toggle-theme='light,dark'
			/>
			<SunIcon />
		</div>
	);
}

function toggleTheme(evt) {
	const themesList = evt.target.getAttribute('data-toggle-theme');
	if (themesList) {
		let themesArray = themesList.split(',');
		if (
			document.documentElement.getAttribute('data-theme') ==
			themesArray[0]
		) {
			if (themesArray.length == 1) {
				document.documentElement.removeAttribute('data-theme');
				localStorage.removeItem('theme');
			} else {
				document.documentElement.setAttribute(
					'data-theme',
					themesArray[1]
				);
				localStorage.setItem('theme', themesArray[1]);
			}
		} else {
			document.documentElement.setAttribute('data-theme', themesArray[0]);
			localStorage.setItem('theme', themesArray[0]);
		}
	}
}
