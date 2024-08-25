import { useEffect, useMemo, useRef } from "react";
import "../../styles/typeahead.css";
import SkeletonLoader from "../../utils/Skeleton";
import ReactDOM from "react-dom";

function UserSearch() {
  // const [usersState, setUsersState] = useState(users);
  const users = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        username: "john.doe",
        profilePicture: "https://placehold.co/150?text=JD",
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "jane.smith",
        profilePicture: "https://placehold.co/150?text=JS",
      },
    ],
    []
  );

  const searchInputRef = useRef<HTMLInputElement>(null);
  const datasetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const searchInput = searchInputRef.current;
    const dataset = datasetRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey) {
        e.preventDefault();
        $(".navbar-search-wrapper").toggleClass("d-none");
        searchInput?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const handleSearch = () => {
      if (searchInput) {
        if (dataset && searchInput.value.length > 1) {
          document.querySelector(".tt-menu")?.classList.add("d-block");

          const filteredUsers = users.filter((user) =>
            user.username
              .toLowerCase()
              .includes(searchInput.value.toLowerCase()) ||
            user.name.toLowerCase().includes(searchInput.value.toLowerCase())
          );

          document.querySelector(".tt-menu")?.classList.add("d-block");
          $(".tt-dataset").empty();

          const skeletonLoader = document.createElement("div");
          ReactDOM.render(
            <div className="tt-suggestion">
              <div className="flex">
                <SkeletonLoader className="rounded-circle me-2 avatar avatar-md" />
                <SkeletonLoader height={44} width={225} />
              </div>
            </div>,
            skeletonLoader
          );
          dataset.appendChild(skeletonLoader);

          timeoutRef.current = window.setTimeout(() => {
            $(".tt-dataset").empty();
            // Simulate loading delay
            filteredUsers.map((user) => {
              const div = document.createElement("div");
              if (user) {
                div.innerHTML = `<div class="tt-suggestion">
                    <div class="align-items-center flex">
                      <div class="avatar avatar-md me-3">
                        <img src="${user.profilePicture}" alt="Avatar" class="rounded-circle w-" />
                      </div>
                      <div>
                        <h6 class="mb-0">${user.name}</h6>
                        <span class="text-muted">@${user.username}</span>
                      </div>
                    </div>
                  </div>`;
              }
              dataset.appendChild(div);
            });
            if (filteredUsers.length === 0) {
              const div = document.createElement("div");
              div.innerHTML = `<div class="tt-suggestion">
              <div class="media align-items-center flex justify-around">
              <div class="media-body">
              <h6 class="mb-0">No results found</h6>
              </div>
              </div>
              </div>`;
              dataset.appendChild(div);
            }
          }, 1000);
        } else if (searchInput.value.length === 0) {
          document.querySelector(".tt-menu")?.classList.remove("d-block");
          $(".tt-dataset").empty();
        }
      }
    };

    searchInput?.addEventListener("input", handleSearch);
    // console.log(isLoading);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      searchInput?.removeEventListener("input", handleSearch);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchInputRef, users]);

  return (
    <div className="navbar-search-wrapper search-input-wrapper d-none">
      <span
        className="twitter-typeahead"
        style={{ position: "relative", display: "inline-block" }}
      >
        <input
          type="text"
          className="form-control search-input container-xxl border-0 tt-input"
          id="search-input"
          placeholder="Search..."
          aria-label="Search..."
          autoComplete="off"
          spellCheck="false"
          style={{ position: "relative", verticalAlign: "top" }}
          ref={searchInputRef}
        />
        <div className="tt-menu navbar-search-suggestion">
          <div className="tt-dataset ml-3" ref={datasetRef}>
            {/* {isLoading && <SkeletonLoader height={44} width={225} />} */}
          </div>
        </div>
      </span>
      <i
        className="bx bx-x ic-md search-toggler cursor-pointer"
        onClick={() => $(".navbar-search-wrapper").toggleClass("d-none")}
      ></i>
    </div>
  );
}

export default UserSearch;
