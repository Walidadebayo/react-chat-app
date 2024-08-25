import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { FaPenToSquare, FaRegTrashCan, FaXmark } from "react-icons/fa6";

interface SideBarLeftProps {
  profilePicture: string;
  name: string;
  username: string;
}

function SideBarLeft({ profilePicture, name, username }: SideBarLeftProps) {
  const [currentName, setCurrentName] = useState(name);
  const [currentUsername, setCurrentUsername] = useState(username);
  const nameRef = useRef<HTMLButtonElement>(null);
  const usernameRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (nameRef.current && nameRef.current.value !== currentName) {
      setCurrentName(nameRef.current.value);
    }

    if (usernameRef.current && usernameRef.current.value !== currentUsername) {
      setCurrentUsername(usernameRef.current.value);
    }
  }, [currentName, currentUsername]);

  return (
    <>
      <div
        className="col app-chat-sidebar-left  sidebar app-sidebar "
        id="app-chat-sidebar-left"
      >
        <div className="chat-sidebar-left-user sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
          <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
            <img src={profilePicture} alt="Avatar" className="rounded-circle" />
          </div>

          <span className="flex justify-between w-full mt-4">
            <p className="mb-0 font-semibold">Name</p>
            <FaPenToSquare
              className="cursor-pointer name ic-sm hover:text-[#696cff]"
              onClick={() => {
                $("input[name=name]").val(currentName).focus();
                $(".editName").removeClass("d-none");
                $(".name").addClass("d-none");
              }}
            />
          </span>
          <span className="text-left w-full mt-2 name">
            <h5 className="mb-0" id="name">
              {currentName}
            </h5>
          </span>

          <span className="d-none w-full editName mt-3">
            <input type="text" className="form-control" name="name" />
            <div className="text-right">
              <Button
                color="primary"
                size="sm"
                className="mt-1"
                onClick={() => {
                  $(".editName").addClass("d-none");
                  $(".name").removeClass("d-none");
                  setCurrentName($("input[name=name]").val() as string);
                }}
              >
                Done
              </Button>
            </div>
          </span>
          <span className="flex justify-between w-full mt-2">
            <p className="mb-0 font-semibold">Username</p>
            <FaPenToSquare
              className="cursor-pointer ic-sm username"
              onClick={() => {
                $("input[name=username]").val(currentUsername).focus();
                $(".editUsername").removeClass("d-none");
                $(".username").addClass("d-none");
              }}
            />
          </span>

          <span className="text-left w-full mt-2 username">
            <h6 className="mb-0 text-muted" id="username">
              @{currentUsername}
            </h6>
          </span>

          <span className="d-none mt-3 w-full editUsername">
            <input type="text" className="form-control" name="username" />
            <div className="text-right">
              <Button
                color="primary"
                size="sm"
                className="mt-1"
                onClick={() => {
                  $(".editUsername").addClass("d-none");
                  $(".username").removeClass("d-none");
                  setCurrentUsername($("input[name=username]").val() as string);
                }}
              >
                Done
              </Button>
            </div>
          </span>
          <FaXmark
            className="cursor-pointer ic-md close-sidebar"
            data-bs-toggle="collapse"
            data-bs-target="#app-chat-sidebar-left"
            onClick={() => {
              $(".app-overlay").removeClass("show");
            }}
          />
        </div>
        <div className="sidebar-body px-6 pb-6">
          <div className="d-flex mt-6">
            <Button
              color="danger"
              dataBsToggle="modal"
              dataBsTarget="#delete-account-modal"
              className="w-100"
            >
              <FaRegTrashCan className="me-1 inline-flex" /> Delete Account
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBarLeft;
