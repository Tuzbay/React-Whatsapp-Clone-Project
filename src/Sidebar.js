import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [dropdown, setDropdown] = useState(false);
  // ! Aşağısı sonradan ekleme ! \\

  const createChat = () => {
    const roomName = prompt("Please Enter Name For Chat Room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  // ! Yukarısı sonradan ekleme ! \\

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} className="avatar" />
        <div className="sidebar__headerRight">
          <IconButton>
            <GroupsIcon />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={() => setDropdown(!dropdown)} />
          </IconButton>
          {dropdown && (
            <div className="menu">
              <ul className="menuList">
                <li className="menuListItem" onClick={createChat}>
                  New Group
                </li>
                <li className="menuListItem">New Community</li>
                <li className="menuListItem">Starred Messages</li>
                <li className="menuListItem">Settings</li>
                <li className="menuListItem">Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined className="search1" />
          <input placeholder="Search or start new chat" type="text" />
        </div>
        <FilterListIcon style={{ color: "gray" }} />
      </div>

      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
