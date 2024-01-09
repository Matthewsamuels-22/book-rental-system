import { createContext } from "react";

export const BorrowContext = createContext(null);

export const borrowTestData = [
	{
		id: "hadg-adhfj-sdba",
		borrower: "Rick Johnson",
		book: "Office Administration by Frank Ramtahal",
		dateBorrowed: new Date(2023, 9, 21),
		dateReturned: new Date(2023, 11, 30),
		conditionBorrowed: "B",
		conditionReturned: "C",
	},
];
