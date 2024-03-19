'use client';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

export default function useIsSafari() {
	const [isSafari, setIsSafari] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const windowWidth = useAppSelector((state) => state.windowReducer.value.windowWidth);

	useEffect(() => {
		const userAgent = navigator.userAgent;

		if (/Safari/i.test(userAgent)) {
			setIsSafari(true);
		}
		if (windowWidth <= 1024) {
			setIsMobile(true);
		}
	}, [windowWidth]);

	return { isSafari, isMobile };
}
