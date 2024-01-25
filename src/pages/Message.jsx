import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export function Message() {
  const [message, setmessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      photoURL,
      uid,
      createdAt: serverTimestamp()
    });
    setmessage("");
  };

  return (
    <Box>
      <div>
        <div>
          <h1>Messages</h1>
        </div>
        <form onSubmit={sendMessage}>
          <TextField
            sx={{ position: "absolute", bottom: 5, width: "78%" }}
            id="standard-basic"
            label="Type message here:"
            variant="standard"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
          <SendIcon
            type="submit"
            sx={{ position: "absolute", bottom: 5, marginLeft: "1220px", fontSize: "medium", color: "blue" }}
          />
        </form>
      </div>
    </Box>
  );
}
