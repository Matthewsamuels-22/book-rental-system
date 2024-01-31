import { createContext } from "react";

export const RequestContext = createContext(null);

export const requestTestData = [
	{
		id: "radg-adhfj-sdba",
		requester: "Pembroke Hall High School",
		book: "Office Administration by Frank Ramtahal",
		requestedDate: new Date(2023, 9, 21),
		quantity: 10,
	},
];
