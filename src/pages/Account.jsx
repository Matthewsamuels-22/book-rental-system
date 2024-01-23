import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import { Stack } from "@mui/material"
import { deepOrange, deepPurple } from '@mui/material/colors';
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
    // Extract the first two characters of the email
    const emailAbbreviation = user.email.slice(0, 2).toUpperCase();
    return (
        <Box 
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        >
            <Stack component="form" spacing={2} onSubmit={handlerest}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56, justifyContent: "center", display: "flex"}}>{emailAbbreviation}</Avatar><br/>
                    <TextField name= "email" variant="filled" value={user.email} sx={{width: 500}}/>
                    <TextField name= "current-password" label="current password" variant="filled" />
                    <TextField name= "new-password"label="updated password" variant="filled" />
                    <Button variant="contained" type="submit">Update</Button>
            </Stack>
           
        </Box>
        
    )
}

