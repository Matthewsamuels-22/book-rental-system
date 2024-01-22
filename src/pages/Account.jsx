import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { getAuth, updatePassword } from "firebase/auth";

export function Account() {
    const auth = getAuth();
    const user = auth.currentUser;


    async function handlerest(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPassword = formData.get("new-password");
        await updatePassword(user, newPassword)
        alert("password updated")
    }
    return (

        <form onSubmit={handlerest}> 
            <TextField name= "current-password" label="current password" variant="filled" />
            <TextField name= "new-password"label="updated password" variant="filled" />
            <Button variant="contained" type="submit">Update</Button>
        </form>
    )
}
