// import React, { useEffect, useState, useContext, useRef  } from "react";
// import { AuthContext } from "../context/AuthContext";
// import socket from "../utils/socket";
// import { FaSignOutAlt, FaPaperPlane } from "react-icons/fa";
// import { toast } from "react-toastify";

// function Chat() {
//   const { user, logout } = useContext(AuthContext);

//   const [joined, setJoined] = useState(false);
//   const [groupActive, setGroupActive] = useState(false);
//   const [usersCount, setUsersCount] = useState(0);
//   const [usersList, setUsersList] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("group_status", (data) => {
//       setUsersCount(data.count);
//       setUsersList(data.users);
//       setGroupActive(data.active);

//       if (data.active) {
//         toast.success("All 3 users joined. Chat Activated 🚀");
//       }
//     });

//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("group_status");
//       socket.off("receive_message");
//     };
//   }, []);

//   const handleJoin = () => {
//     socket.emit("join_general", user);
//     setJoined(true);
//     toast.info("Joined General Group");
//   };

//   const handleSend = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       sender: user.name,
//       text: message,
//       time: new Date().toLocaleTimeString(),
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   return (
//     <div className="vh-100 d-flex flex-column">

//       {/* HEADER */}
//       <div
//         className="d-flex justify-content-between align-items-center p-3"
//         style={{ backgroundColor: "#075e54", color: "#fff" }}
//       >
//         <div>
//           <h5 className="m-0">General Group</h5>
//           <small>{usersCount}/3 Joined</small>
//         </div>

//         <div>
//           <span className="me-3">{user?.name}</span>
//           <FaSignOutAlt
//             style={{ cursor: "pointer" }}
//             onClick={logout}
//           />
//         </div>
//       </div>

//       {/* JOIN BUTTON */}
//       {!joined && (
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-success btn-modern px-4"
//             onClick={handleJoin}
//           >
//             Join General Group
//           </button>
//         </div>
//       )}

//       {/* CHAT BODY */}
//       {joined && (
//         <>
//           <div
//             className="flex-grow-1 p-3"
//             style={{
//               overflowY: "auto",
//               backgroundColor: "#ece5dd",
//             }}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`d-flex mb-2 ${
//                   msg.sender === user.name
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   style={{
//                     backgroundColor:
//                       msg.sender === user.name
//                         ? "#dcf8c6"
//                         : "#fff",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     maxWidth: "60%",
//                   }}
//                 >
//                   <strong>{msg.sender}</strong>
//                   <div>{msg.text}</div>
//                   <small className="text-muted">
//                     {msg.time}
//                   </small>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* INPUT */}
//           <div className="p-3 bg-light d-flex">
//             <input
//               type="text"
//               className="form-control me-2"
//               placeholder={
//                 groupActive
//                   ? "Type message..."
//                   : "Waiting for 3 users to join..."
//               }
//               disabled={!groupActive}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button
//               className="btn btn-success btn-modern"
//               disabled={!groupActive}
//               onClick={handleSend}
//             >
//               <FaPaperPlane />
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Chat;


// import React, { useEffect, useState, useContext, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import socket from "../utils/socket";
// import { FaSignOutAlt, FaPaperPlane, FaSmile } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import chatbodyBg from '../assets/chatbody-bg.jpg'

// function Chat() {
//   const { user, logout } = useContext(AuthContext);

//   const [joined, setJoined] = useState(false);
//   const [groupActive, setGroupActive] = useState(false);
//   const [usersCount, setUsersCount] = useState(0);
//   const [usersList, setUsersList] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmoji, setShowEmoji] = useState(false);

//   const bottomRef = useRef(null);
//   const emojiRef = useRef(null);

//   useEffect(() => {
//     socket.on("group_status", (data) => {
//       setUsersCount(data.count);
//       setUsersList(data.users);
//       setGroupActive(data.active);
//     });

//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("group_status");
//       socket.off("receive_message");
//     };
//   }, []);

//   // ✅ AUTO SCROLL
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ CLOSE EMOJI WHEN CLICK OUTSIDE
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         emojiRef.current &&
//         !emojiRef.current.contains(event.target)
//       ) {
//         setShowEmoji(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleJoin = () => {
//     socket.emit("join_general", user);
//     setJoined(true);
//   };

//   const handleSend = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       sender: user.name,
//       text: message,
//       time: new Date().toLocaleTimeString(),
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prev) => prev + emojiData.emoji);
//   };

//   return (
//     <div className="vh-100 d-flex flex-column">

//       {/* HEADER */}
//       <div
//         className="d-flex justify-content-between align-items-center p-3"
//         style={{ backgroundColor: "#075e54", color: "#fff" }}
//       >
//         <div>
//           <h5 className="m-0">General Group</h5>
//           <small>{usersCount}/3 Joined</small>
//         </div>

//         <div>
//           <span className="me-3">{user?.name}</span>
//           <FaSignOutAlt
//             style={{ cursor: "pointer" }}
//             onClick={logout}
//           />
//         </div>
//       </div>

//       {/* JOIN BUTTON */}
//       {!joined && (
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-success btn-modern px-4"
//             onClick={handleJoin}
//           >
//             Join General Group
//           </button>
//         </div>
//       )}

//       {/* CHAT BODY */}
//       {joined && (
//         <>
//           <div
//             className="flex-grow-1 p-3"
//             style={{
//               overflowY: "auto",
//               backgroundColor: "#ece5dd",
//             }}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`d-flex mb-2 ${
//                   msg.sender === user.name
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                 }`}
//               >
//                 <div
//                   style={{
//                     backgroundColor:
//                       msg.sender === user.name
//                         ? "#dcf8c6"
//                         : "#fff",
//                     padding: "10px 14px",
//                     borderRadius: "18px",
//                     maxWidth: "60%",
//                   }}
//                 >
//                   <strong>{msg.sender}</strong>
//                   <div>{msg.text}</div>
//                   <small className="text-muted">
//                     {msg.time}
//                   </small>
//                 </div>
//               </div>
//             ))}

//             <div ref={bottomRef}></div>
//           </div>

//           {/* INPUT */}
//           <div className="p-3 bg-light d-flex position-relative">

//             <button
//               className="btn btn-light me-2"
//               onClick={() => setShowEmoji(!showEmoji)}
//             >
//               <FaSmile />
//             </button>

//             <input
//               type="text"
//               className="form-control me-2"
//               placeholder={
//                 groupActive
//                   ? "Type message..."
//                   : "Waiting for 3 users to join..."
//               }
//               disabled={!groupActive}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />

//             <button
//               className="btn btn-success btn-modern"
//               disabled={!groupActive}
//               onClick={handleSend}
//             >
//               <FaPaperPlane />
//             </button>

//             {showEmoji && (
//               <div
//                 ref={emojiRef}
//                 style={{
//                   position: "absolute",
//                   bottom: "70px",
//                   left: "10px",
//                   zIndex: 1000,
//                 }}
//               >
//                 <EmojiPicker
//                   onEmojiClick={handleEmojiClick}
//                   previewConfig={{ showPreview: false }}
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Chat;


// import React, { useEffect, useState, useContext, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import socket from "../utils/socket";
// import { FaSignOutAlt, FaPaperPlane, FaSmile } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import bgImg from "../assets/chatbody-bg.jpg";

// function Chat() {
//   const { user, logout } = useContext(AuthContext);

//   const [joined, setJoined] = useState(false);
//   const [groupActive, setGroupActive] = useState(false);
//   const [usersCount, setUsersCount] = useState(0);
//   const [usersList, setUsersList] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmoji, setShowEmoji] = useState(false);

//   const bottomRef = useRef(null);
//   const emojiRef = useRef(null);

//   useEffect(() => {
//     socket.on("group_status", (data) => {
//       setUsersCount(data.count);
//       setUsersList(data.users);
//       setGroupActive(data.active);
//     });

//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("group_status");
//       socket.off("receive_message");
//     };
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//         setShowEmoji(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleJoin = () => {
//     socket.emit("join_general", user);
//     setJoined(true);
//   };

//   const handleSend = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       sender: user.name,
//       text: message,
//       time: new Date().toLocaleTimeString(),
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prev) => prev + emojiData.emoji);
//   };

//   return (
//     <div className="vh-100 d-flex flex-column">
//       {/* HEADER */}
//       <div
//         className="d-flex justify-content-between align-items-center p-3"
//         style={{ backgroundColor: "#075e54", color: "#fff" }}
//       >
//         <div>
//           <h5 className="m-0">General Group</h5>
//           <small>{usersCount}/3 Joined</small>
//         </div>

//         <div>
//           <span className="me-3">{user?.name}</span>
//           <FaSignOutAlt style={{ cursor: "pointer" }} onClick={logout} />
//         </div>
//       </div>

//       {/* JOIN BUTTON */}
//       {!joined && (
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-success btn-modern px-4"
//             onClick={handleJoin}
//           >
//             Join General Group
//           </button>
//         </div>
//       )}

//       {/* CHAT BODY */}
//       {joined && (
//         <>
//           <div
//             className="flex-grow-1 p-3"
//             style={{
//               overflowY: "auto",
//               backgroundImage: `url(${bgImg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               backgroundAttachment: "fixed",
//             }}
//           >
//             {/* Messages Layer */}
//             <div style={{ position: "relative", zIndex: 1 }}>
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`d-flex mb-2 ${msg.sender === user.name
//                     ? "justify-content-end"
//                     : "justify-content-start"
//                     }`}
//                 >
//                   <div
//                     style={{
//                       backgroundColor:
//                         msg.sender === user.name
//                           ? "#dcf8c6"
//                           : "#fff",
//                       padding: "10px 14px",
//                       borderRadius: "18px",
//                       maxWidth: "60%",
//                     }}
//                   >
//                     <strong>{msg.sender}</strong>
//                     <div>{msg.text}</div>
//                     <small className="text-muted">{msg.time}</small>
//                   </div>
//                 </div>
//               ))}

//               <div ref={bottomRef}></div>
//             </div>
//           </div>

//           {/* INPUT */}
//           <div className="p-3 bg-light d-flex position-relative">
//             <button
//               className="btn btn-light me-2"
//               onClick={() => setShowEmoji(!showEmoji)}
//             >
//               <FaSmile />
//             </button>

//             <input
//               type="text"
//               className="form-control me-2"
//               placeholder={
//                 groupActive
//                   ? "Type message..."
//                   : "Waiting for 3 users to join..."
//               }
//               disabled={!groupActive}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />

//             <button
//               className="btn btn-success btn-modern"
//               disabled={!groupActive}
//               onClick={handleSend}
//             >
//               <FaPaperPlane />
//             </button>

//             {showEmoji && (
//               <div
//                 ref={emojiRef}
//                 style={{
//                   position: "absolute",
//                   bottom: "70px",
//                   left: "10px",
//                   zIndex: 1000,
//                 }}
//               >
//                 <EmojiPicker
//                   onEmojiClick={handleEmojiClick}
//                   previewConfig={{ showPreview: false }}
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Chat;


import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import socket from "../utils/socket";
import { FaSignOutAlt, FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import bgImg from "../assets/chatbody-bg.jpg";

function Chat() {
  const { user, logout } = useContext(AuthContext);

  const [joined, setJoined] = useState(false);
  const [groupActive, setGroupActive] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const bottomRef = useRef(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    socket.on("group_status", (data) => {
      setUsersCount(data.count);
      setUsersList(data.users);
      setGroupActive(data.active);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("group_status");
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleJoin = () => {
    socket.emit("join_general", user);
    setJoined(true);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: user.name,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="vh-100 d-flex flex-column">

      {/* HEADER */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#075e54", color: "#fff" }}
      >
        <div>
          <h5 className="m-0">General Group</h5>
          <small>{usersCount}/3 Joined</small>
        </div>

        <div>
          <span className="me-3">{user?.name}</span>
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={logout} />
        </div>
      </div>

      {/* JOIN BUTTON SCREEN WITH BACKGROUND */}
      {!joined && (
        <div
          className="flex-grow-1 d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <button
            className="btn btn-success btn-modern px-4"
            onClick={handleJoin}
          >
            Join General Group
          </button>
        </div>
      )}

      {/* CHAT BODY */}
      {joined && (
        <>
          <div
            className="flex-grow-1 p-3"
            style={{
              overflowY: "auto",
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          >
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-2 ${
                    msg.sender === user.name
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    style={{
                      backgroundColor:
                        msg.sender === user.name ? "#dcf8c6" : "#fff",
                      padding: "10px 14px",
                      borderRadius: "18px",
                      maxWidth: "60%",
                    }}
                  >
                    <strong>{msg.sender}</strong>
                    <div>{msg.text}</div>
                    <small className="text-muted">{msg.time}</small>
                  </div>
                </div>
              ))}

              <div ref={bottomRef}></div>
            </div>
          </div>

          {/* INPUT */}
          <div className="p-3 bg-light d-flex position-relative">
            <button
              className="btn btn-light me-2"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <FaSmile />
            </button>

            <input
              type="text"
              className="form-control me-2"
              placeholder={
                groupActive
                  ? "Type message..."
                  : "Waiting for 3 users to join..."
              }
              disabled={!groupActive}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button
              className="btn btn-success btn-modern"
              disabled={!groupActive}
              onClick={handleSend}
            >
              <FaPaperPlane />
            </button>

            {showEmoji && (
              <div
                ref={emojiRef}
                style={{
                  position: "absolute",
                  bottom: "70px",
                  left: "10px",
                  zIndex: 1000,
                }}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;