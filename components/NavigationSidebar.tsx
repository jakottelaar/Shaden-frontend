"use client";
import { useState } from "react";
import DirectMessageButton from "./DirectMessageButton";
import SettingsModal from "./SettingsModal";

const NavigationSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("direct-messages");

  return (
    <div className="flex h-screen flex-col bg-primary-1000 p-3">
      <DirectMessageButton selectedOption={selectedOption} />
      <SettingsModal />
    </div>
  );
};

export default NavigationSidebar;
