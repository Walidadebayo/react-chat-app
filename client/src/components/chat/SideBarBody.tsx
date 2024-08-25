import { useEffect, useRef } from "react";
import SkeletonLoader from "../../utils/Skeleton";
import UseLoading from "../../utils/UseLoading";

interface SideBarBodyProps {
  profilePicture: string;
  contacts: {
    id: number | string;
    name: string;
    profilePicture: string;
    lastMessage: {
      content: string;
      timeAgo: string;
    };
    unreadMessages: number;
  }[];
}

function SideBarBody({ contacts, profilePicture }: SideBarBodyProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchInput = searchInputRef.current;
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase(); // case-insensitive search
        const chatListItems = document.querySelectorAll(
          "#chat-list li:not(.chat-contact-list-item-title)"
        ); // exclude the title
        chatListItems.forEach((item: Element) => {
          const chatContactName =
            item
              ?.querySelector(".chat-contact-name")
              ?.textContent?.toLowerCase() ?? ""; // case-insensitive search
          if (chatContactName?.indexOf(searchValue) === -1) {
            // not found
            item.classList.add("d-none");
          } else {
            item.classList.remove("d-none");
          }
          if (
            chatListItems.length ===
            document.querySelectorAll("#chat-list li.d-none").length // all items are hidden
          ) {
            console.log(
              document.querySelectorAll("#chat-list li.d-none").length,
              chatListItems.length
            );
            document
              .querySelector(".chat-list-item-0")
              ?.classList.remove("d-none"); // show "No Chats Found"
          } else {
            document
              .querySelector(".chat-list-item-0")
              ?.classList.add("d-none"); // hide "No Chats Found"
          }
        });
      });
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener("input", () => {});
      }
    };
  }, [searchInputRef]);

  const isLoading = UseLoading();

  return (
    <>
      <div
        className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end !rounded-l-3xl"
        id="app-chat-contacts"
      >
        <div className="sidebar-header px-6 border-bottom d-flex align-items-center">
          <div className="d-flex align-items-center me-6 me-lg-0">
            <div
              className="flex-shrink-0 avatar avatar-online me-4"
              data-bs-toggle="collapse"
              onClick={() => {
                $(".app-overlay").addClass("show");
              }}
              data-bs-target="#app-chat-sidebar-left"
            >
              {isLoading ? (
                <SkeletonLoader
                  height={40}
                  width={40}
                  className="rounded-circle"
                />
              ) : (
                <img
                  className="user-avatar rounded-circle cursor-pointer"
                  src={profilePicture}
                  alt="Avatar"
                />
              )}
            </div>
            <div className="flex-grow-1 input-group input-group-merge rounded-pill">
              <span className="input-group-text" id="basic-addon-search31">
                <i className="bx bx-search ic-sm"></i>
              </span>
              <input
                type="text"
                className="form-control chat-search-input"
                placeholder="Search by name or username or email"
                ref={searchInputRef}
              />
            </div>
          </div>
          <i
            className="bx bx-x ic-md cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
            data-bs-toggle="collapse"
            data-bs-target="#app-chat-contacts"
          ></i>
        </div>
        <div className="sidebar-body scrollbar">
          <ul
            className="list-unstyled chat-contact-list py-2 mb-0"
            id="chat-list"
          >
            <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
              <h5 className="text-primary mb-0 text-2xl">Chats</h5>
            </li>
            <li
              className={
                "chat-contact-list-item chat-list-item-0 " +
                (contacts.length > 1 ? "d-none" : "")
              }
            >
              <h6 className="text-muted mb-0">
                {contacts.length > 1 ? "No Contacts Found" : "No Contacts Yet"}
              </h6>
            </li>
            {contacts.map((contact) => (
              <li className="chat-contact-list-item mb-1" key={contact.id}>
                <a className="d-flex align-items-center">
                  {isLoading ? (
                    <SkeletonLoader
                      height={40}
                      width={40}
                      className="rounded-circle"
                    />
                  ) : (
                    <div className="flex-shrink-0 avatar avatar-online">
                      <img
                        src={contact.profilePicture}
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </div>
                  )}
                  {isLoading ? (
                    <SkeletonLoader
                      height={44}
                      width={225}
                      containerClassName="ms-4"
                    />
                  ) : (
                    <div className="chat-contact-info flex-grow-1 ms-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                          {contact.name}
                        </h6>
                        <small className="text-muted">
                          {contact.lastMessage.timeAgo}
                        </small>
                      </div>
                      <div className="flex justify-between">
                        <small className="chat-contact-status text-truncate">
                          {contact.lastMessage.content}
                        </small>
                        <span className="badge badge-pill bg-label-primary">
                          {contact.unreadMessages ? contact.unreadMessages : ""}
                        </span>
                      </div>
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBarBody;
