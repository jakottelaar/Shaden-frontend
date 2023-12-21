import { Dispatch, SetStateAction } from "react";
import AddFriendModal from "./AddFriendModal";

const FriendsOverviewNavbar = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row space-x-4 text-white">
      <h1 className="pointer-events-none flex items-center font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="me-2 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        Friends
      </h1>
      <button
        onClick={() => setSelectedOption("Online")}
        className={`rounded-md px-3 py-1 transition-all duration-300 hover:bg-primary-1000 ${
          selectedOption === "Online" ? "bg-primary-1000" : ""
        }`}
      >
        Online
      </button>
      <button
        data-testid="all-friends-button"
        onClick={() => setSelectedOption("All")}
        className={`rounded-md p-1 px-4 transition-all duration-300 hover:bg-primary-1000 ${
          selectedOption === "All" ? "bg-primary-1000" : ""
        }`}
      >
        All
      </button>
      <button
        data-testid="pending-friends-button"
        onClick={() => setSelectedOption("Pending")}
        className={`rounded-md px-3 py-1 transition-all duration-300 hover:bg-primary-1000 ${
          selectedOption === "Pending" ? "bg-primary-1000" : ""
        }`}
      >
        Pending
      </button>
      <button
        className={`rounded-md px-3 py-1 transition-all duration-300 hover:bg-primary-1000 ${
          selectedOption === "Blocked" ? "bg-primary-1000" : ""
        }`}
      >
        Blocked
      </button>
      <AddFriendModal />
    </div>
  );
};

export default FriendsOverviewNavbar;
