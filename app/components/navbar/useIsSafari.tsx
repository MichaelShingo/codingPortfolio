import { useEffect, useState } from 'react';

export default function useIsSafari() {
	const [isSafari, setIsSafari] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const isSafariMobile = isSafari && isMobile;

	useEffect(() => {
		const userAgent = navigator.userAgent;

		if (/Safari/i.test(userAgent)) {
			setIsSafari(true);
		}
		if (/iPhone|iPad|iPod/i.test(userAgent)) {
			setIsMobile(true);
		}
	}, []);

	return [isSafari, isSafariMobile];
}
