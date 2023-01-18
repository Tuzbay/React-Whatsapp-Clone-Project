import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "./StateProvider";
import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import ImageIcon from "@mui/icons-material/Image";
import PollIcon from "@mui/icons-material/Poll";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // ! Aşağısı sonradan ekleme ! \\

  const [openDocument, setOpenDocument] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // ! Yukarısı sonradan ekleme ! \\

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          className="chat__headerInfoAvatar"
        />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Tap Here for Group Info</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert onClick={() => setDropdown(!dropdown)} />
          </IconButton>
          {dropdown && (
            <div className="menu">
              <ul className="menuList">
                <li className="menuListItem">Group Info</li>
                <li className="menuListItem">Select Message</li>
                <li className="menuListItem">Unmute Notification</li>
                <li className="menuListItem">Clear Messages</li>
                <li className="menuListItem">Leave the Group</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString(
                navigator.language,
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon style={{ cursor: "pointer" }} />
        <AttachFile
          style={{ transform: "rotate(45deg)", cursor: "pointer" }}
          onClick={() => setOpenDocument(!openDocument)}
        />
        {openDocument && (
          <div className="documentation">
            {/* <li className="documentation__element">
              <PollIcon /> <div className="popup"> Survey</div>
            </li> */}
            <li className="documentation__element">
              <PersonIcon /> <div className="popup"> Contact</div>
            </li>
            <li className="documentation__element">
              <InsertDriveFileIcon />
              <div className="popup"> Document</div>
            </li>
            <li className="documentation__element">
              <CameraAltIcon />
              <div className="popup"> Camera</div>
            </li>
            <li className="documentation__element">
              <PhotoFilterIcon />
              <div className="popup sticker"> Sticker</div>
            </li>
            <li className="documentation__element">
              <ImageIcon />
              <div className="popup photosvideos"> Photos & Videos</div>
            </li>
          </div>
        )}
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
