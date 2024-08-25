import UseLoading from "../../utils/UseLoading";
import Button from "../Button";
import UserSearch from "./UserSearch";
import SkeletonLoader from "../../utils/Skeleton";

interface HeaderProps {
  name: string;
  username: string;
  profilePicture: string;
}

function Header({ profilePicture, name, username }: HeaderProps) {
  const isLoading = UseLoading();
  return (
    <header>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item navbar-search-wrapper mb-0">
              <Button
                className="nav-item nav-link search-toggler px-0"
                onClick={() => {
                  $(".navbar-search-wrapper").toggleClass("d-none");
                  $(".navbar-search-wrapper input").focus();
                }}
              >
                <i className="bx bx-search ic-md"></i>
                <span className="d-none d-md-inline-block text-muted text-xl fw-normal ms-3">
                  Search (Ctrl+/)
                </span>
              </Button>
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
              <Button
                className="nav-link dropdown-toggle hide-arrow"
                dataBsToggle="dropdown"
              >
                <i className="bx ic-md bx-sun"></i>
              </Button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                  <Button className="dropdown-item active">
                    <span>
                      <i className="bx bx-sun ic-md me-3"></i>Light
                    </span>
                  </Button>
                </li>
                <li>
                  <Button className="dropdown-item">
                    <span>
                      <i className="bx bx-moon ic-md me-3"></i>Dark
                    </span>
                  </Button>
                </li>
                <li>
                  <Button className="dropdown-item">
                    <span>
                      <i className="bx bx-desktop ic-md me-3"></i>System
                    </span>
                  </Button>
                </li>
              </ul>
            </li>
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <Button
                className="nav-link dropdown-toggle hide-arrow p-0"
                dataBsToggle="dropdown"
                size="sm"
              >
                <div className="avatar avatar-online">
                  {isLoading ? (
                    <SkeletonLoader
                      height={40}
                      width={40}
                      className="rounded-circle"
                    />
                  ) : (
                    <img
                      src={profilePicture}
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  )}
                </div>
              </Button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Button className="dropdown-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src={profilePicture}
                            alt=""
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          <span>{name}</span>
                        </h6>
                        <small className="text-muted">{username}</small>
                      </div>
                    </div>
                  </Button>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="collapse"
                    data-bs-target="#app-chat-sidebar-left"
                    onClick={() => {
                      $(".app-overlay").addClass("show");
                    }}
                  >
                    <i className="bx bx-user ic-md me-3"></i>
                    <span>My Profile</span>
                  </button>
                </li>

                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#logout-account-modal"
                  >
                    <i className="bx bx-power-off ic-md me-3"></i>
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <UserSearch />
      </nav>
    </header>
  );
}

export default Header;
