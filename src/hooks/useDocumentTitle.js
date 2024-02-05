import { useEffect } from "react";

/**
 * @param {string} title
 * @param {boolean} partial Whether or not to append the app title
 */
export function useDocumentTitle(title, partial = true) {
	useEffect(() => {
		if (!partial) {
			document.title = title;
			return;
		}

		document.title = `${title} | ${import.meta.env.VITE_APP_TITLE}`;

		return () => {
			document.title = import.meta.env.VITE_APP_TITLE;
		}
	}, []);
}