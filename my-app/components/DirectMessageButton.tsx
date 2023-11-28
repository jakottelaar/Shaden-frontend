import Image from "next/image";
import React from "react";

const DirectMessageButton = ({
  selectedOption,
}: {
  selectedOption: string;
}) => {
  return (
    <button
      className={`group relative flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-100 transition-all duration-200 ease-linear hover:rounded-2xl hover:bg-white ${
        selectedOption === "direct-messages" ? "rounded-2xl bg-white" : ""
      }`}
    >
      <Image
        src="/Shaden-logo.png"
        alt="Direct Message Icon"
        width={32}
        height={32}
      />
    </button>
  );
};

export default DirectMessageButton;
