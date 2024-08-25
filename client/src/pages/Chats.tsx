import "../styles/chat.css";
import ChatHistory from "../components/chat/ChatHistory";
import SideBarBody from "../components/chat/SideBarBody";
import SideBarLeft from "../components/chat/SideBarLeft";
import Header from "../components/header/Header";
import Modal from "../components/Modal";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/150",
    lastMessage: {
      content: "Hey, how are you?",
      timeAgo: "2 days",
    },
    unreadMessages: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    profilePicture: "https://via.placeholder.com/150",
    lastMessage: {
      content: "See you tomorrow!",
      timeAgo: "4 days",
    },
    unreadMessages: 0,
  },
];

const messages = [
  {
    id: 1,
    sender: {
      id: 1,
      profilePicture: "https://placehold.co/150?text=JD",
    },
    receiver: {
      id: 2,
      profilePicture: "https://placehold.co/150?text=JS",
    },
    content: "Hello, how are you?",
    timestamp: "2023-10-01T12:39:56Z",
    isRead: true,
  },
  {
    id: 2,
    sender: {
      id: 2,
      profilePicture: "https://placehold.co/150?text=JD",
    },
    receiver: {
      id: 1,
      profilePicture: "https://placehold.co/150?text=JS",
    },
    content: "Hello, how are you?1",
    timestamp: "2023-10-01T12:34:56Z",
    isRead: true,
  },
  {
    id: 3,
    sender: {
      id: 1,
      profilePicture: "https://placehold.co/150?text=JD",
    },
    receiver: {
      id: 2,
      profilePicture: "https://placehold.co/150?text=JS",
    },
    content: "Hello, how are you?2",
    timestamp: "2023-10-01T12:34:56Z",
  },
  {
    id: 4,
    sender: {
      id: 2,
      profilePicture: "https://example.co/profile3.jpg",
    },
    receiver: {
      id: 1,
      profilePicture: "https://placehold.co/150?text=JD",
    },
    content: "I'm good, thanks!",
    timestamp: "2023-10-01T12:35:56Z",
  },
];

const receiver = {
  id: 2,
  name: "Jane Smith",
  username: "jane.smith",
  profilePicture: "https://placehold.co/150?text=JS",
};

function Chats() {
  return (
    <>
      <Header
        profilePicture="https://via.placeholder.com/150"
        name="John Doe"
        username="johndoe"
      />
      <div className="app-chat card my-20">
        <div className="row g-0 rounded-r-3xl">
          <SideBarLeft
            name="John Doe"
            username="johndoe"
            profilePicture="https://via.placeholder.com/150"
          />
          <SideBarBody
            profilePicture="https://via.placeholder.com/150"
            contacts={contacts}
          />
          <ChatHistory
            messages={messages}
            receiver={receiver}
            clearChat={() => {}}
            sendMessage={() => {}}
          />
          <div className="app-overlay"></div>
        </div>
      </div>
      <Modal
        modalId="delete-account-modal"
        modalTitle="Delete Account"
        modalBody="Are you sure you want to delete your account?"
        btnOnClick={() => {}}
        btnText="Delete Account"
        btnColor="danger"
        btnCloseColor="primary"
      />
      <Modal
        modalId="logout-account-modal"
        modalTitle="Logout"
        modalBody="Are you sure you want to logout your account?"
        btnOnClick={() => {}}
        btnText="Logout"
        btnColor="danger"
        btnCloseColor="primary"
      />
    </>
  );
}

export default Chats;
