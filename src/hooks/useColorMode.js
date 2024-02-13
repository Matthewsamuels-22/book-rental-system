import { useCallback, useMemo, useState } from "react";

export function useColorMode() {
	const [mode, setMode] = useState(window.localStorage.getItem("colorMode") ?? "light");

	const isDark = useMemo(() => {
		window.localStorage.setItem("colorMode", mode);
		document.documentElement.style.colorScheme = mode;
		return mode === "dark";
	}, [mode]);

	const toggle = useCallback(
		() => setMode((previousMode) => (previousMode === "dark" ? "light" : "dark")),
		[],
	);

	return { mode, toggle, isDark };
}
