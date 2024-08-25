import ChatHistoryFooter from "./ChatHistoryFooter";
import SkeletonLoader from "../../utils/Skeleton";
import UseLoading from "../../utils/UseLoading";
import { BiDotsVerticalRounded, BiPhone, BiVideo } from "react-icons/bi";

interface ChatHistoryProps {
  receiver: {
    id: string | number;
    name: string;
    username: string;
    profilePicture: string;
  };
  messages: {
    id: string | number;
    sender: {
      id: string | number;
      profilePicture: string;
    };
    receiver: {
      id: string | number;
      profilePicture: string;
    };
    content: string;
    timestamp: string;
    isRead?: boolean;
  }[];
  clearChat: () => void;
  sendMessage: () => void;
}

function ChatMessageRight({
  children,
  message,
}: {
  message: ChatHistoryProps["messages"][0];
  children: React.ReactNode;
}) {
  const isLoading = UseLoading();
  return (
    <li className={"chat-message chat-message-right"}>
      <div className="d-flex overflow-hidden">
        <div className="chat-message-wrapper flex-grow-1">
          {isLoading ? (
            children
          ) : (
            <div className="chat-message-text">
              <p className="mb-0">{message.content}</p>
            </div>
          )}
          <div className="text-end text-muted mt-1">
            {message.isRead ? (
              <i className="bx bx-check-double bx-16px text-success me-1"></i>
            ) : (
              <i className="bx bx-check-double bx-16px text-secondary me-1"></i>
            )}
            <small>
              {new Date(message.timestamp).toLocaleTimeString().slice(0, -3)}
            </small>
          </div>
        </div>
        <div className="user-avatar flex-shrink-0 ms-4">
          <div className="avatar avatar-sm">
            <img
              src={message.sender.profilePicture}
              alt="Avatar"
              className="rounded-circle"
            />
          </div>
        </div>
      </div>
    </li>
  );
}

function ChatMessageLeft({
  message,
  children,
}: {
  message: ChatHistoryProps["messages"][0];
  children: React.ReactNode;
}) {
  const isLoading = UseLoading();
  return (
    <li className="chat-message">
      <div className="d-flex overflow-hidden">
        <div className="user-avatar flex-shrink-0 me-4">
          <div className="avatar avatar-sm">
            <img
              src={message.receiver.profilePicture}
              alt="Avatar"
              className="rounded-circle"
            />
          </div>
        </div>
        <div className="chat-message-wrapper flex-grow-1">
          {isLoading ? (
            children
          ) : (
            <div className="chat-message-text">
              <p className="mb-0">{message.content}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

const ChatBody = ({
  messages,
  receiver,
}: {
  messages: ChatHistoryProps["messages"];
  receiver: ChatHistoryProps["receiver"];
}) => (
  <div className="chat-history-body scrollbar">
    <ul className="list-unstyled chat-history">
      {messages.map((message) =>
        message.sender.id !== receiver.id ? (
          <ChatMessageRight message={message} key={message.id}>
            <SkeletonLoader
              height={40}
              width={162}
              className="rounded-[0.375rem] !rounded-tr-none"
            />
          </ChatMessageRight>
        ) : (
          <ChatMessageLeft message={message} key={message.id}>
            <SkeletonLoader
              height={40}
              width={162}
              className="rounded-[0.375rem] !rounded-tl-none"
            />
          </ChatMessageLeft>
        )
      )}
    </ul>
  </div>
);

function ChatHeader({
  receiver,
  clearChat,
}: {
  receiver: ChatHistoryProps["receiver"];
  clearChat: ChatHistoryProps["clearChat"];
}) {
  const isLoading = UseLoading();
  return (
    <div className="chat-history-header border-bottom rounded-tr-xl rounded-r-[0.375rem]">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex overflow-hidden align-items-center">
          <i
            className="bx bx-menu ic-lg cursor-pointer d-lg-none d-block me-4"
            data-bs-toggle="collapse"
            data-bs-target="#app-chat-contacts"
          ></i>
          <div className="flex-shrink-0 avatar avatar-online">
            {isLoading ? (
              <SkeletonLoader
                height={40}
                width={40}
                className="rounded-circle"
              />
            ) : (
              <img
                src={receiver.profilePicture}
                alt="Avatar"
                className="rounded-circle"
                data-bs-toggle="collapse"
                data-bs-target="#app-chat-sidebar-right"
              />
            )}
          </div>
          <div className="chat-contact-info flex-grow-1 ms-4">
            <h6 className="m-0 fw-normal">
              {isLoading ? (
                <SkeletonLoader height={20} width={100} />
              ) : (
                receiver.name
              )}
            </h6>
            <small className="user-status text-body">
              {isLoading ? (
                <SkeletonLoader height={20} width={100} />
              ) : (
                receiver.username
              )}
            </small>
          </div>
        </div>
        <div className="d-flex align-items-center">
            <BiPhone className="cursor-pointer me-3 ic-md text-secondary" />
            <BiVideo className="cursor-pointer ic-md me-3 text-secondary"/>
          {/* <i className="bx bx-phone ic-md cursor-pointer btn btn-icon text-secondary me-1"></i>
          <i className="bx bx-video ic-md cursor-pointer btn btn-icon text-secondary me-1"></i> */}
          <div className="dropdown">
            {/* <button
              className="btn btn-icon "
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="chat-header-actions"
              > */}
              <BiDotsVerticalRounded className="ic-md text-secondary cursor-pointer dropdown-toggle hide-arrow" 
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="chat-header-actions"
              />
              {/* <i className="bx bx-dots-vertical-rounded ic-md"></i> */}
            {/* </button> */}
            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="chat-header-actions"
            >
              <button className="dropdown-item" onClick={clearChat}>
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHistory({
  receiver,
  messages,
  clearChat,
  sendMessage,
}: ChatHistoryProps) {
  return (
    <>
      <div className="col app-chat-history rounded-r-xl">
        <div className="chat-history-wrapper">
          <ChatHeader receiver={receiver} clearChat={clearChat} />
          <ChatBody messages={messages} receiver={receiver} />
          <ChatHistoryFooter sendMessage={sendMessage} />
        </div>
      </div>
    </>
  );
}

export default ChatHistory;
