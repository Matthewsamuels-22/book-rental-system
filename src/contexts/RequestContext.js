import { createContext } from "react";

export const RequestContext = createContext(null);

export const requestTestData = [
    {
        id: "hadg-adhfj-sdba",
        requester: "Pembroke Hall High School",
        book: "Office Administration by Frank Ramtahal",
        dateRequested: new Date(2023, 9, 21),
        amountRequested: 10,
    },
];