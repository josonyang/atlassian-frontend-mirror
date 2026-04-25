import { useEffect, useRef, useState, type MutableRefObject } from 'react';

export const useInViewport = <RefType extends Element>(): {
	isInViewport: boolean;
	trackingRef: MutableRefObject<RefType | null>;
} => {
	const trackingRef = useRef<RefType | null>(null);
	const [isInViewport, setIsInViewport] = useState<boolean>(false);

	useEffect(() => {
		if (!trackingRef || !trackingRef?.current) {
			return;
		}
		const target = trackingRef.current;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setIsInViewport(true);
				}
			}
		});
		observer.observe(target);
		return () => observer.disconnect();
	}, [trackingRef]);

	return { isInViewport, trackingRef };
};
