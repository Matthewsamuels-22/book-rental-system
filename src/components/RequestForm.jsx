import PropTypes from "prop-types";
import { useContext } from "react";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { dateFromIsoDateString } from "../utilities/dateparser";
import { RequestContext } from "../contexts/RequestContext";
import { dateToIsoDateString } from "../utilities/dateformat";

export function RequestForm(props) {
    const { requests, setRequests } = useContext(RequestContext);

    function handlerequest(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const requester = formData.get("requester");
        const book = formData.get("book");
        const dateRequested = dateFromIsoDateString(formData.get("dateRequested"));
        const amountRequested = formData.get("amountRequested");

        const requestData = {
            requester,
            book,
            dateRequested,
            amountRequested,
            id: window.crypto.randomUUID(),
        };
        
        setRequests([...requests, requestData]);
        console.log(requestData);
        props.postSubmit();
    }
    return (
        <Stack component="form" id={props.id} onSubmit={handlerequest} spacing={2}>
            <TextField label="Requester" name="requester" required />
            <TextField label="Book" name="book" required />
            <TextField label="Date Requested" name="dateRequested" defaultValue={dateToIsoDateString(new Date())} type="datetime" fullWidth required />
            <TextField label="Amount Requested" name="amountRequested" type="number" required />
        </Stack>
    );
}

RequestForm.propTypes = {
    id: PropTypes.string.isRequired,
    postSubmit: PropTypes.func.isRequired,
};
