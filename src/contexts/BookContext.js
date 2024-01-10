import { createContext } from "react";

export const BookContext = createContext(null);

export const bookTestData = [
	{
		id: "badg-adhfj-sdba",
		title: "Information Technology for Cxc Csec",
		authors: ["Glenda Gay", "Ronald Blades", "Tim Roderick"],
		edition: 0,
		volume: 0,
		publisher: "Oxford University Press",
		yearPublished: 2005,
	},
	{
		id: "badg-adhfj-sdbb",
		title: "Mathematics: A Complete Course with CXC Questions",
		authors: ["Raymond Toolsie"],
		edition: 2,
		volume: 1,
		publisher: "Caribbean Educational Publishers",
		yearPublished: 2004,
	},
	{
		id: "badg-adhfj-sdbc",
		title: "Collins Exploring Physics: Grade 9 for Jamaica",
		authors: ["Derek McMonagle"],
		edition: 0,
		volume: 0,
		publisher: "HarperCollins Publishers Limited",
		yearPublished: 2017,
	},
	{
		id: "badg-adhfj-sdbd",
		title: "Office Administration",
		authors: ["Frank Ramtahal"],
		edition: 0,
		volume: 0,
		publisher: "Caribbean Educational Publishers",
		yearPublished: 0,
	},
];
