import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, username });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  return (
    <div className="App">
      <div className="joinRoomContainer">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div className="messageContainer">
        <input
          type="text"
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div className="messages">
        <h1>Messages:</h1>
        {messageReceived.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
